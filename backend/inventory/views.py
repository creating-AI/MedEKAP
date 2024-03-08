from django.db.models import Sum
from rest_framework import generics
from .models import Inventory, Products, Location, Emergency, Medication
from .serializer import InventorySerializer, ProductsSerializer, LocationSerializer, EmergencySerializer, MedicationSerializer


class ProductsList(generics.ListCreateAPIView):
    serializer_class = ProductsSerializer
    # Use get_queryset to circumvent cache issues
    def get_queryset(self):
        # Update all quantity in stock entries on product list load
        stock = Inventory.objects.values('product').annotate(quantity=Sum('quantity')).order_by('product')
        # Before updating set all quantity_stock to zero, in case a product has no inventory -> thus wouldn't be updated 
        Products.objects.all().update(quantity_stock=0)
        for data in stock:
            Products.objects.filter(id=data['product']).update(quantity_stock=data['quantity'])
        return Products.objects.all()

class ProductsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class InventoryList(generics.ListCreateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class InventoryListById(generics.ListCreateAPIView):
    serializer_class = InventorySerializer
    def get_queryset(self):
        id = self.kwargs['pk']
        return Inventory.objects.filter(product=id)

class InventoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer



class MediKitLocation(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class MediKitLocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer    



class EmergencyList(generics.ListCreateAPIView):
    queryset = Emergency.objects.all()
    serializer_class = EmergencySerializer

class EmergencyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Emergency.objects.all()
    serializer_class = EmergencySerializer

class MedicationList(generics.ListCreateAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

class MedicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

class MedicationListById(generics.ListCreateAPIView):
    serializer_class = MedicationSerializer
    def get_queryset(self):
        id = self.kwargs['pk']
        return Medication.objects.filter(emergency=id)