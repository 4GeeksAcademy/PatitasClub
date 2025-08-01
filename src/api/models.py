from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, ForeignKey, Integer, Float, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
import enum

db = SQLAlchemy()

class Status(enum.Enum):
    CART = 'cart'
    PENDING = 'pending'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120),nullable=True) 
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped [bool] = mapped_column(Boolean(), nullable=False)

    order: Mapped [List["Order"]] = relationship(
        back_populates= "user", cascade= "all, delete-orphan"
    )


    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Order(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    status: Mapped[Status] = mapped_column(default= Status.CART)
    
    
    user: Mapped ["User"] = relationship(
        back_populates= "order" 
    )
    order_item: Mapped [List["OrderItem"]] = relationship(
        back_populates= "order", cascade= "all, delete-orphan"
    )


    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.id,
            
            # do not serialize the password, its a security breach
        }
    
class Category(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(), nullable=False)
    
    
    
    product_category: Mapped[List["ProductCategory"]] = relationship(
        back_populates="category", cascade= "all, delete-orphan"
    )


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            # do not serialize the password, its a security breach
        } 
    
class PetType(db.Model):
    id: Mapped[int] = mapped_column(primary_key= True) 
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    products: Mapped[List["Product"]] = relationship(
        back_populates = "pet_type", cascade = "all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Product(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(), nullable=False)
    photo: Mapped[str] = mapped_column(String(), nullable=False) 
    coste: Mapped[float] = mapped_column(Float(), nullable=False)
    price: Mapped[float] = mapped_column(Float(), nullable=False)
    pet_type_id: Mapped[int] = mapped_column(ForeignKey("pet_type.id"))
    stock: Mapped[int] = mapped_column(Integer(), nullable=True)
    


    pet_type: Mapped["PetType"] = relationship(
        back_populates="products")
    
    order_items: Mapped[List["OrderItem"]] = relationship(
        back_populates= "product", cascade= "all, delete-orphan"
    )

    list_product_category: Mapped[List["ProductCategory"]] = relationship(
        back_populates="product", cascade= "all, delete-orphan"
    )


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "photo": self.photo,
            "coste": self.coste,
            "price": self.price,
            "stock": self.stock,
            
            # do not serialize the password, its a security breach
        }
    
class ProductCategory(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))
    
    product: Mapped["Product"] = relationship (
        back_populates="list_product_category"
    )
    category: Mapped["Category"] = relationship(
        back_populates="product_category"
    )

    def serialize(self):
        return {
            "id": self.id,
            "category_id": self.id,
            "product": self.product,
            "product_id": self.produc_id,
        
            # do not serialize the password, its a security breach
        }

class OrderItem(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("order.id")) 
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))
    cant: Mapped[int] = mapped_column(Integer(), nullable=False)
    order: Mapped ["Order"] = relationship(
        back_populates= "order_item"
    )
    product: Mapped["Product"]= relationship(
        back_populates= "order_items"
    )

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "cant": self.cant,
            # do not serialize the password, its a security breach
        }