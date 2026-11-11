"""añadir_tema_a_sesiones_estudio

Revision ID: 6573184529b1
Revises: 6bdfb7c3271e
Create Date: 2026-11-10 15:33:09.751868

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6573184529b1'
down_revision: Union[str, None] = '6bdfb7c3271e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'sesiones_estudio',
        sa.Column('tema', sa.String(length=255), nullable=False, server_default='Estudio Colaborativo'),
        schema='sesiones'
    )


def downgrade() -> None:
    op.drop_column('sesiones_estudio', 'tema', schema='sesiones')
