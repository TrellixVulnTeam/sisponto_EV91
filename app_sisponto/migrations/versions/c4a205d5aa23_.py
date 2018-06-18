"""empty message

Revision ID: c4a205d5aa23
Revises: a12e9b34f89b
Create Date: 2018-06-17 13:29:05.991580

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4a205d5aa23'
down_revision = 'a12e9b34f89b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('TBProjeto', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descricaoProj', sa.String(length=256), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('TBProjeto', schema=None) as batch_op:
        batch_op.drop_column('descricaoProj')

    # ### end Alembic commands ###
