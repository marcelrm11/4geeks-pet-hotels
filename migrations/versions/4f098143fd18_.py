"""
Creates "countries_zip_codes" table.

Revision ID: 4f098143fd18
Revises: ce06612991f0
Create Date: 2023-02-02 11:50:56.268568

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f098143fd18'
down_revision = 'ce06612991f0'
branch_labels = None
depends_on = None


def upgrade():
    
    op.create_table('countries_zip_codes',
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('country_iso', sa.String(), nullable=True),
    sa.Column('zip_regex', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('country_iso')
    )


def downgrade():
    
    op.drop_table('countries_zip_codes')
