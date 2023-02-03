"""
Creates "users" table.

Revision ID: 98e401f2189f
Revises: 
Create Date: 2023-01-31 09:43:51.200022

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '98e401f2189f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=32), nullable=False),
    sa.Column('confirm_passowrd', sa.String(length=32), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=30), nullable=False),
    sa.Column('zip_code', sa.String(length=30), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )


def downgrade():
    
    op.drop_table('users')
