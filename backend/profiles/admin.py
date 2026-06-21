from django.contrib import admin

from .models import Profile

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('get_user', 'get_skills')

    def get_user(self, obj):
        return obj.user.username
    
    def get_skills(self, obj):
        return obj.skills.all()