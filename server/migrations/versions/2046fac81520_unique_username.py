"""unique username

Revision ID: 2046fac81520
Revises: 52b517afa18e
Create Date: 2024-02-13 11:48:05.293026

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2046fac81520'
down_revision = '52b517afa18e'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint(
            'unique_username_constraint', ['username'])


def downgrade():
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint('unique_username_constraint', type_='unique')
