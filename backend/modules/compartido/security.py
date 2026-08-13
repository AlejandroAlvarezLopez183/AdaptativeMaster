"""
Utilidades de seguridad compartidas: hash de contraseñas, generación/validación de JWT.
Usado principalmente por el módulo 'usuarios', pero vive aquí porque otros módulos
también necesitan validar el token (dependencia de autenticación).
"""
# from jose import jwt
# from passlib.context import CryptContext
