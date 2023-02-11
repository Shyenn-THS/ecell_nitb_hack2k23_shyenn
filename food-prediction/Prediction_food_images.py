from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt
import io
import numpy as np
import os
from tensorflow.keras.models import load_model
from PIL import Image

#creating a list of all the foods, in the argument i put the path to the folder that has all folders for food
def create_foodlist(path):
    list_ = list()
    for root, dirs, files in os.walk(path, topdown=False):
      for name in dirs:
        list_.append(name)
    return list_    

#loading the model i trained and finetuned        
my_model = load_model('model_trained.h5', compile = False)
food_list = create_foodlist("food-101/images") 

#function to help in predicting classes of new images loaded from my computer(for now) 
def predict_dish(img):
  image = Image.open(img)
  image = image.resize((299, 299))      
  image_array = np.array(image, dtype=np.float64)           
  img = np.expand_dims(image_array, axis=0)         
  img = img.astype('float32')
  img /= 255                                      

  pred = my_model.predict(img)
  index = np.argmax(pred)
  food_list_sorted = sorted(food_list)
  pred_value = food_list_sorted[index]
  return pred_value

