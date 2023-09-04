from django.shortcuts import render
from django.db.models import Sum

# Create your views here.
from .models import TimePeriodDetection, Slots
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TimePeriodDetectionSerializer, SlotsSerializer, DateRangeSerializer
from rest_framework import status
from api.models import CustomUser

from dateutil import parser
import requests, json


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def time_period(request):
    if request.method == 'GET':

        data = TimePeriodDetection.objects.all()
        # test = TimePeriodDetection.objects.values('id').annotate(total_wage_in_detection_period = Sum('slots__wage'))
        # print(test)
        serializer = TimePeriodDetectionSerializer(data, many=True)
        return Response({'timeperiods':serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        timeperiod = TimePeriodDetection()
        timeperiod.user = request.user
        timeperiod.agreement_id = request.data['agreementId']
        timeperiod.agreement_name = request.data['agreementName']
        timeperiod.start = request.data['startDate']
        timeperiod.end = request.data['endDate']
        timeperiod.wage_per_hour = request.data['wagePerHour']
        timeperiod.save()

        serializer = TimePeriodDetectionSerializer(timeperiod, many=False)
        return Response({'timeperiod':serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def slots(request, id):
    if request.method == 'GET':
        # data = Slots.objects.select_related().get(id=id)
        data = Slots.objects.filter(timeperiod__id = id)
        serializer = SlotsSerializer(data, many=True)
        return Response({'slots':serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        try:
          timeperiod =   TimePeriodDetection.objects.get(pk=id)

        except TimePeriodDetection.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(request.data['startDateTime'])
        print(request.data['endDateTime'])
        slots= Slots()
        slots.timeperiod = timeperiod
        slots.title = request.data['title']
        slots.start = parser.parse(request.data['startDateTime'])
        slots.end = parser.parse(request.data['endDateTime'])
        slots.background_color = request.data['backgroundColor']
        slots.days_of_week = request.data['daysOfWeek']
        slots.leaves = request.data['leaves']
        slots.wage_per_slot = request.data['wagePerSlot']
        slots.save()
        serializer = SlotsSerializer(slots, many=False)
        return Response({'slots':serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def slot(request, id):
        if request.method == 'PATCH':
            try:
                slot = Slots.objects.get(pk=id)
            except Slots.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            slot.title = request.data['title']
            slot.start = parser.parse(request.data['startDateTime'])
            slot.end = parser.parse(request.data['endDateTime'])
            slot.background_color = request.data['backgroundColor']
            slot.days_of_week = request.data['daysOfWeek']
            slot.leaves= request.data['leaves']
            slot.wage_per_slot = request.data['wagePerSlot']
            slot.save()
            serializer = SlotsSerializer(slot, many=False)
            return Response({'slot':serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def agreementDetail(request, id):
        if request.method == 'GET':
            data = TimePeriodDetection.objects.get(pk=id)
            serializer = DateRangeSerializer(data, many=False)
            return Response({'agreementdetail':serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def awards(request):
    if request.method == 'GET':
        url_awards = "https://uatapi.fwc.gov.au/api/v1/awards?page=1&limit=100"
        hdr = {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '57d39731a7124c4d977f3b1fcbaf956a',
        }
        req = requests.get(url_awards, headers=hdr)
        convert_json = json.loads(req.text)
        return Response({'awards':convert_json}, status=status.HTTP_200_OK)
    return Response({'error':'Awards not loaded from goverment api'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def awardClassifications(request, award_fixed_id):
    if request.method == 'GET':
        
        url_classification = "https://uatapi.fwc.gov.au/api/v1/awards/{award_fixed_id}/pay-rates?page=1&limit=100".format(award_fixed_id=award_fixed_id)
        hdr = {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '57d39731a7124c4d977f3b1fcbaf956a',
        }
        req = requests.get(url_classification, headers=hdr)
        
        convert_json = json.loads(req.text)
    
      
        return Response({'classifications':convert_json}, status=status.HTTP_200_OK)
    return Response({'error':'Award Classifications not loaded from goverment api'}, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def awards(request, code):
#     if request.method == 'GET':
#         url_classifications = "https://uatapi.fwc.gov.au/api/v1/awards/{code}/classifications?page=1&limit=100"
#         url_expense-allowances = "https://uatapi.fwc.gov.au/api/v1/awards/{code}/expense-allowances?page=1&limit=100"
#         url_penalties = "https://uatapi.fwc.gov.au/api/v1/awards/{code}/penalties?page=1&limit=100"
#         url_wage-allowances = "https://uatapi.fwc.gov.au/api/v1/awards/{code}/wage-allowances?page=1&limit=100"
#         hdr = {
#         'Cache-Control': 'no-cache',
#         'Ocp-Apim-Subscription-Key': '57d39731a7124c4d977f3b1fcbaf956a',
#         }
#         req = requests.get(url_awards, headers=hdr)
#         convert_json = json.loads(req.text)
#         return Response({'awards':convert_json}, status=status.HTTP_200_OK)
#     return Response({'error':'Awards not loaded fron goverment api'}, status=status.HTTP_400_BAD_REQUEST)