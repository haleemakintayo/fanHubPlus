from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merchandise', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='merchandiseitem',
            name='popularity_score',
            field=models.FloatField(db_index=True, default=0.0),
        ),
    ]
