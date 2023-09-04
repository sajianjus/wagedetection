from django.contrib import admin
from import_export.admin import ExportActionMixin
from .models import TimePeriodDetection, Slots
# Register your models here.



class TimePeriodDetectionAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ("agreement_name","start", "end")
    list_filter = ("agreement_name",)


class SlotsAdmin(admin.ModelAdmin):
    list_display = ("title","start", "end")

admin.site.register(TimePeriodDetection,  TimePeriodDetectionAdmin)
admin.site.register(Slots, SlotsAdmin)