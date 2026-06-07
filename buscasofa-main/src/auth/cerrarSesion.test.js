import { cerrarSesion } from './cerrarSesion';

describe('cerrarSesion', () => {
  it('lanza TypeError si storage es null', () => {
    expect(() => cerrarSesion(null, jest.fn())).toThrow(TypeError);
    expect(() => cerrarSesion(null, jest.fn())).toThrow('dependencias de sesion invalidas');
  });

  it('elimina el token y llama al callback con null', () => {
    const storage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    storage.getItem.mockReturnValue('mi-token');
    const callback = jest.fn();

    cerrarSesion(storage, callback);

    expect(storage.removeItem).toHaveBeenCalledWith('token');
    expect(callback).toHaveBeenCalledWith(null);
  });

  it('no borra buscasofaData del storage', () => {
    const storage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    const callback = jest.fn();

    cerrarSesion(storage, callback);

    expect(storage.removeItem).toHaveBeenCalledWith('token');
    expect(storage.removeItem).not.toHaveBeenCalledWith('buscasofaData');
    expect(storage.removeItem).toHaveBeenCalledTimes(1);
  });

  it('funciona aunque el storage no tenga token', () => {
    const storage = {
      getItem: jest.fn().mockReturnValue(null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    const callback = jest.fn();

    cerrarSesion(storage, callback);

    expect(callback).toHaveBeenCalledWith(null);
  });

  it('se puede llamar dos veces sin problemas', () => {
    const storage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    const callback = jest.fn();

    cerrarSesion(storage, callback);
    cerrarSesion(storage, callback);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
