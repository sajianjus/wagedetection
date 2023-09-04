from rest_framework import serializers
from .models import TimePeriodDetection, Slots
# from django.db.models import Sum
from datetime import datetime



class TimePeriodDetectionSerializer(serializers.ModelSerializer):
    total_wage_in_detection_period = serializers.ReadOnlyField()

    class Meta:
        model = TimePeriodDetection
        fields = ['id', 'agreement_id', 'agreement_name', 'start', 'end', 'wage_per_hour', 'total_wage_in_detection_period']

 
    
    # total_wage_in_detection_period = serializers.SerializerMethodField()
    # def get_total_wage_in_detection_period(self, instance):
    #     return  SlotsSerializer(instance.slots_set.all().annotate(Sum('wage')), many=True).data



class SlotsSerializer(serializers.ModelSerializer):
    startTime = serializers.SerializerMethodField()
    endTime = serializers.SerializerMethodField()


    class Meta:
        model = Slots
        fields = ['id', 'title', 'start', 'end', 'background_color', 'days_of_week', 'leaves', 'wage_per_slot', 'startTime', 'endTime']


    def get_startTime(self, obj):
        return datetime.strftime(obj.start, '%H:%M:%S')
    
    def get_endTime(self, obj):
        return datetime.strftime(obj.end, '%H:%M:%S')




class DateRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimePeriodDetection
        fields = ['id', 'agreement_id', 'start', 'end', 'wage_per_hour']
 



# startDate = "2023-09-01"
# endDate ="2023-09-30"
# df = pd.DataFrame({"start_date": pd.to_datetime([startDate]), "end_date": pd.to_datetime([endDate])})
# df['New'] = [pd.date_range(x,y).weekday.isin([1,3,5]).sum() for x, y in zip(df.start_date, df.end_date)]
