"""empty message

Revision ID: 75f8867d6c3f
Revises: 
Create Date: 2023-02-17 11:32:55.673754

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '75f8867d6c3f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('countries_zip_codes',
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('country_iso', sa.String(), nullable=False),
    sa.Column('zip_regex', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('country_iso')
    )
    op.create_table('owner',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=32), nullable=False),
    sa.Column('confirm_password', sa.String(length=32), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=30), nullable=False),
    sa.Column('zip_code', sa.String(length=30), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=32), nullable=False),
    sa.Column('confirm_password', sa.String(length=32), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=30), nullable=False),
    sa.Column('zip_code', sa.String(length=30), nullable=False),
    sa.Column('phone_number', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('hotel',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=30), nullable=False),
    sa.Column('zip_code', sa.String(length=30), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.Column('location', sa.String(length=70), nullable=False),
    sa.Column('services', sa.String(length=100), nullable=False),
    sa.Column('hotel_description', sa.String(length=500), nullable=False),
    sa.Column('hotel_owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['hotel_owner_id'], ['owner.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('pet_type', sa.String(length=50), nullable=False),
    sa.Column('breed', sa.String(length=50), nullable=False),
    sa.Column('birth_date', sa.String(), nullable=False),
    sa.Column('health', sa.String(length=50), nullable=False),
    sa.Column('pet_owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['pet_owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('hotel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['hotel_id'], ['hotel.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('photo_url', sa.String(), nullable=True),
    sa.Column('hotel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['hotel_id'], ['hotel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review_text', sa.String(length=200), nullable=False),
    sa.Column('rating', sa.Float(precision=2), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('author', sa.String(length=50), nullable=False),
    sa.Column('hotel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['hotel_id'], ['hotel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('room',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pet_type', sa.String(length=30), nullable=False),
    sa.Column('hotel_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['hotel_id'], ['hotel.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('booking',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('pet_id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('hotel_id', sa.Integer(), nullable=False),
    sa.Column('room_id', sa.Integer(), nullable=False),
    sa.Column('create_date', sa.DateTime(), nullable=False),
    sa.Column('entry_date', sa.DateTime(), nullable=False),
    sa.Column('checkout_date', sa.DateTime(), nullable=False),
    sa.Column('price', sa.Float(precision=2), nullable=False),
    sa.Column('currency', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['hotel_id'], ['hotel.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['owner.id'], ),
    sa.ForeignKeyConstraint(['pet_id'], ['pets.id'], ),
    sa.ForeignKeyConstraint(['room_id'], ['room.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('invoice',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('booking_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('hotel_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(precision=2), nullable=False),
    sa.Column('currency', sa.String(length=20), nullable=False),
    sa.Column('billing_address', sa.String(length=80), nullable=False),
    sa.Column('payment_ref', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['booking_id'], ['booking.id'], ),
    sa.ForeignKeyConstraint(['hotel_id'], ['hotel.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('invoice')
    op.drop_table('booking')
    op.drop_table('room')
    op.drop_table('review')
    op.drop_table('photo')
    op.drop_table('favorite')
    op.drop_table('pets')
    op.drop_table('hotel')
    op.drop_table('user')
    op.drop_table('owner')
    op.drop_table('countries_zip_codes')
    # ### end Alembic commands ###
