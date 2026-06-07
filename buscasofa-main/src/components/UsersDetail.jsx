// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersDetail.css';

function UsersDetail() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', email: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Extraer user_id del JWT token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in localStorage');
      return null;
  }
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const decoded = JSON.parse(atob(parts[1]));
      return decoded.id;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  // Cargar datos del usuario
  useEffect(() => {
    if (!userId) {
      setError('No autenticado. Por favor, inicia sesión.');
      setLoading(false);
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Fetch user data response:', res);

        if (!res.ok) {
          if (res.status === 404) {
            setError('Usuario no encontrado');
          } else if (res.status === 401) {
            setError('Token inválido o expirado');
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            const data = await res.json();
            setError(data.message || 'Error al cargar datos del usuario');
          }
          return;
        }

        const data = await res.json();
        console.log('User data:', data);
        if (data && data.length > 0) {
          setUserData(data[0]);
          setEditForm({ username: data[0].username, email: data[0].email });
        }
      } catch (err) {
        setError('Error al cargar los datos del usuario');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      setEditForm({ username: userData.username, email: userData.email });
    }
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!editForm.username.trim() && !editForm.email.trim()) {
      setMessage('Debes proporcionar al menos username o email');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: editForm.username.trim() || undefined,
          email: editForm.email.trim() || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Error al actualizar el usuario');
        return;
      }

      setMessage('Usuario actualizado correctamente');
      setUserData({ username: editForm.username, email: editForm.email });
      setIsEditing(false);
    } catch (err) {
      setMessage('Error al guardar los cambios');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.message || 'Error al eliminar la cuenta');
        return;
      }

      // Limpiar sesión y redirigir
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      setMessage('Error al eliminar la cuenta');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="users-detail-container"><p>Cargando...</p></div>;
  }

  if (error) {
    return (
      <div className="users-detail-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="users-detail-container">
        <p>No se pudo cargar la información del usuario</p>
      </div>
    );
  }

  return (
    <main className="users-detail-container">
      <div className="users-detail-card">
        <h1>Mi Perfil</h1>
        
        {message && (
          <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}

        {!isEditing ? (
          <div className="user-view">
            <div className="user-field">
              <label>Usuario:</label>
              <span>{userData.username}</span>
            </div>
            <div className="user-field">
              <label>Email:</label>
              <span>{userData.email}</span>
            </div>

            <div className="button-group">
              <button className="btn btn-edit" onClick={handleEditClick}>
                Editar
              </button>
              <button className="btn btn-delete" onClick={handleDelete}>
                Eliminar Cuenta
              </button>
            </div>
          </div>
        ) : (
          <form className="user-edit" onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={editForm.username}
                onChange={handleInputChange}
                placeholder="Dejar en blanco para no cambiar"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editForm.email}
                onChange={handleInputChange}
                placeholder="Dejar en blanco para no cambiar"
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-save">
                Guardar
              </button>
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default UsersDetail;
