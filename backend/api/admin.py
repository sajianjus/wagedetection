from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser




class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('name', "email", "is_staff", "is_active", "date_joined", "sent_verification_email", "verified_email", "verification_email_secret", "reset_password_secret")
    list_filter = ('name', "email", "is_staff", "is_active", "date_joined", "sent_verification_email", "verified_email")
    fieldsets = (
        (None, {"fields": ('name', "email", "password", "date_joined", "sent_verification_email", "verified_email")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "is_staff","is_active")}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)





admin.site.register(CustomUser, CustomUserAdmin)
admin.site.index_title = "Nebula Administration"
admin.site.site_header = "Nebula Administration"
admin.site.site_title = "Nebula Administration"