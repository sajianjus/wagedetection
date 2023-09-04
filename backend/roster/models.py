from django.db import models
from api.models import CustomUser
from django.db.models import Sum
from django.contrib.postgres.fields import ArrayField
# Create your models here.





class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True





class TimePeriodDetection(TimeStampedModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    agreement_id = models.IntegerField()
    agreement_name = models.CharField(max_length=200)
    start = models.DateField()
    end = models.DateField()
    wage_per_hour = models.DecimalField(max_digits=20, decimal_places=2, default=0)

    class Meta:
        ordering=['-id']

    def __str__(self):
        return f"%s - %s TO %s" % (self.agreement_name, self.start, self.end)


    @property
    def total_wage_in_detection_period(self):
        return self.timeperiodslot.aggregate(Sum('wage_per_slot'))['wage_per_slot__sum']




class Slots(TimeStampedModel):
    timeperiod = models.ForeignKey(TimePeriodDetection, on_delete=models.CASCADE, related_name="timeperiodslot")
    title = models.CharField(max_length=50, default='None')
    start = models.DateTimeField()
    end = models.DateTimeField()
    background_color = models.CharField(max_length=50)
    leaves = ArrayField(models.DateField())
    days_of_week = ArrayField(models.IntegerField())
    wage_per_slot = models.DecimalField(max_digits=20, decimal_places=2, default=0)

    class Meta:
        verbose_name_plural = 'Shifts'

    def __str__(self):
        return f"%s - %s TO %s" % (self.title, self.start, self.end)