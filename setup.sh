set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"

patch_file() {
  local FILE="$1"
  if [[ -f "$FILE" ]]; then
    sed -i "s|http://localhost:4000/api|/api|g" "$FILE"
  fi
}

patch_file "$REPO_ROOT/buscasofa-main/src/components/Login.jsx"
patch_file "$REPO_ROOT/buscasofa-main/src/components/Register.jsx"
patch_file "$REPO_ROOT/buscasofa-main/src/components/Comments.jsx"

cat > "$REPO_ROOT/buscasofa-server-main/secret.js" << 'EOF'
const secret = "6isvK1s%40nLRnku";
module.exports = { secret };
EOF
