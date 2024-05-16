import numpy as np
import skfuzzy as fuzz
import pyrebase
from flask import Flask, jsonify
from statistics import mode


config = {

}

# Initialize the Firebase app
firebase = pyrebase.initialize_app(config)

app = Flask(__name__)
def fuzzy():
    # Get a reference to the 'Heart Rate' node
    db = firebase.database()
    heart_rate_ref = db.child('Heart Rate')

    heart_rate_data = heart_rate_ref.get()
    heart_rate_readings = []
    if heart_rate_data.each():
        for item in heart_rate_data.each():
            heart_rate_readings.append(item.val())
    heart_rate_readings.pop(0)
    
    SpO2_ref = db.child('SpO2 levels')
    SpO2_data = SpO2_ref.get()
    SpO2_readings = []
    if SpO2_data.each():
        for item in SpO2_data.each():
            SpO2_readings.append(item.val())
    SpO2_readings.pop(0)
    
    temperature_ref = db.child('Temperature')
    temperature_data = temperature_ref.get()
    temperature_readings = []
    if temperature_data.each():
        for item in temperature_data.each():
            temperature_readings.append(item.val())
    temperature_readings.pop(0)
    
    console_heart = int(sum(heart_rate_readings) // len(heart_rate_readings))
    console_spO2 = int(sum(SpO2_readings) // len(SpO2_readings))
    console_temp = mode(temperature_readings)

    heart_rate_universe = np.arange(0, 201, 1)
    classification = ['bradycardia', 'normal', 'atrial_fibrillation']

    heart_rate_membership = {
        'bradycardia': fuzz.trimf(heart_rate_universe, [0, 0, 60]),
        'normal': fuzz.trimf(heart_rate_universe, [60, 80, 100]),
        'atrial_fibrillation': fuzz.trimf(heart_rate_universe, [100, 200, 200])
    }

    # Calculate average membership degrees
    average_membership_degrees = {
        label: np.mean([fuzz.interp_membership(heart_rate_universe, membership_func, hr) for hr in heart_rate_readings]) 
        for label, membership_func in heart_rate_membership.items()
    }
    # Normalize membership degrees to get probabilities
    total_membership = sum(average_membership_degrees.values())
    probabilities = {label: membership / total_membership for label, membership in average_membership_degrees.items()}

    response = {
        "heart": console_heart,
        "SpO2": console_spO2,
        "temperature": console_temp,
        "heartList": heart_rate_readings,
        "SpO2List":SpO2_readings,
        "temperatureList": temperature_readings , 
        "result": {
            "label": max(probabilities, key=probabilities.get),
            "probability": probabilities[max(probabilities, key=probabilities.get)] * 100
        }
    }
    return jsonify(response)

@app.route('/Fuzzy/route')
def fuzzy_route():
    return fuzzy()
