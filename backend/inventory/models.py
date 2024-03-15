from django.db import models

# Product types
class Products(models.Model):
    name = models.CharField(max_length=100)
    quantity_min = models.IntegerField()
    quantity_max = models.IntegerField()
    quantity_stock = models.IntegerField()

    def __str__(self):
        return self.name

# Holds inventory items related to products
class Inventory(models.Model):
    product = models.ForeignKey(Products, blank=True, null=True, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    expiration_date = models.DateField(verbose_name=("expiration"), null=True)

    def __str__(self):
        return self.product

# Medi Kit Location [holds only one value]
class Location(models.Model):
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.location 
    
# Action Plans for Emergency cases
class Emergency(models.Model):
    title = models.CharField(max_length=100)
    default = models.CharField(max_length=1000)
    custom = models.CharField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.title
    
# Holds medication related to emergency cases
class Medication(models.Model):
    emergency = models.ForeignKey(Emergency, blank=True, null=True, on_delete=models.CASCADE)
    medicine = models.CharField(max_length=100)

    def __str__(self):
        return self.emergency