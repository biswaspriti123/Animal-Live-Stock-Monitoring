import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddAnimalModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    sex: '',
    weight: '',
    location: '',
    healthScore: '',
    temperature: '',
    heartRate: '',
    activity: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breedOptions = [
    { value: '', label: 'Select breed' },
    { value: 'holstein', label: 'Holstein' },
    { value: 'jersey', label: 'Jersey' },
    { value: 'angus', label: 'Angus' },
    { value: 'guernsey', label: 'Guernsey' },
    { value: 'hereford', label: 'Hereford' }
  ];

  const sexOptions = [
    { value: '', label: 'Select sex' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const locationOptions = [
    { value: '', label: 'Select location' },
    { value: 'pasture-a', label: 'Pasture A' },
    { value: 'pasture-b', label: 'Pasture B' },
    { value: 'barn-1', label: 'Barn 1' },
    { value: 'barn-2', label: 'Barn 2' },
    { value: 'isolation', label: 'Isolation Unit' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Animal name is required';
    }

    if (!formData?.breed) {
      newErrors.breed = 'Breed is required';
    }

    if (!formData?.age || parseFloat(formData?.age) <= 0) {
      newErrors.age = 'Valid age is required';
    }

    if (!formData?.sex) {
      newErrors.sex = 'Sex is required';
    }

    if (!formData?.weight || parseFloat(formData?.weight) <= 0) {
      newErrors.weight = 'Valid weight is required';
    }

    if (!formData?.location) {
      newErrors.location = 'Location is required';
    }

    const temp = parseFloat(formData?.temperature);
    if (formData?.temperature && (temp < 35 || temp > 45)) {
      newErrors.temperature = 'Temperature must be between 35-45°C';
    }

    const hr = parseFloat(formData?.heartRate);
    if (formData?.heartRate && (hr < 40 || hr > 150)) {
      newErrors.heartRate = 'Heart rate must be between 40-150 BPM';
    }

    const activity = parseFloat(formData?.activity);
    if (formData?.activity && (activity < 0 || activity > 100)) {
      newErrors.activity = 'Activity must be between 0-100%';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const validationErrors = validateForm();

    if (Object?.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newAnimal = {
        id: `A${(Date.now() % 1000)?.toString()?.padStart(3, '0')}`,
        name: formData?.name,
        breed: formData?.breed,
        age: `${formData?.age} years`,
        sex: formData?.sex,
        weight: `${formData?.weight} kg`,
        location: formData?.location,
        healthScore: formData?.healthScore ? parseFloat(formData?.healthScore) : 85 + Math.random() * 15,
        temperature: formData?.temperature ? parseFloat(formData?.temperature) : 37.5 + Math.random() * 1.5,
        heartRate: formData?.heartRate ? parseFloat(formData?.heartRate) : 65 + Math.random() * 25,
        activity: formData?.activity ? parseFloat(formData?.activity) : 50 + Math.random() * 40,
        status: 'healthy',
        lastCheckup: new Date()?.toISOString()?.split('T')?.[0],
        notes: formData?.notes || 'Newly added animal - baseline monitoring started',
        medications: []
      };

      onAdd?.(newAnimal);
      handleClose();
    } catch (error) {
      console.error('Error adding animal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        breed: '',
        age: '',
        sex: '',
        weight: '',
        location: '',
        healthScore: '',
        temperature: '',
        heartRate: '',
        activity: '',
        notes: ''
      });
      setErrors({});
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Add New Animal</h2>
                <p className="text-sm text-muted-foreground">Enter details for the new animal</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={handleClose}
                disabled={isSubmitting}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Animal Name *"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    placeholder="Enter animal name"
                    error={errors?.name}
                  />
                  
                  <Select
                    label="Breed *"
                    options={breedOptions}
                    value={formData?.breed}
                    onChange={(value) => handleInputChange('breed', value)}
                    error={errors?.breed}
                  />

                  <Input
                    label="Age (years) *"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData?.age}
                    onChange={(e) => handleInputChange('age', e?.target?.value)}
                    placeholder="Enter age"
                    error={errors?.age}
                  />

                  <Select
                    label="Sex *"
                    options={sexOptions}
                    value={formData?.sex}
                    onChange={(value) => handleInputChange('sex', value)}
                    error={errors?.sex}
                  />

                  <Input
                    label="Weight (kg) *"
                    type="number"
                    min="0"
                    value={formData?.weight}
                    onChange={(e) => handleInputChange('weight', e?.target?.value)}
                    placeholder="Enter weight"
                    error={errors?.weight}
                  />

                  <Select
                    label="Location *"
                    options={locationOptions}
                    value={formData?.location}
                    onChange={(value) => handleInputChange('location', value)}
                    error={errors?.location}
                  />
                </div>
              </div>

              {/* Health Metrics (Optional) */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Initial Health Metrics (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Health Score (0-100)"
                    type="number"
                    min="0"
                    max="100"
                    value={formData?.healthScore}
                    onChange={(e) => handleInputChange('healthScore', e?.target?.value)}
                    placeholder="Auto-generated if empty"
                  />

                  <Input
                    label="Temperature (°C)"
                    type="number"
                    step="0.1"
                    min="35"
                    max="45"
                    value={formData?.temperature}
                    onChange={(e) => handleInputChange('temperature', e?.target?.value)}
                    placeholder="35-45°C"
                    error={errors?.temperature}
                  />

                  <Input
                    label="Heart Rate (BPM)"
                    type="number"
                    min="40"
                    max="150"
                    value={formData?.heartRate}
                    onChange={(e) => handleInputChange('heartRate', e?.target?.value)}
                    placeholder="40-150 BPM"
                    error={errors?.heartRate}
                  />

                  <Input
                    label="Activity Level (%)"
                    type="number"
                    min="0"
                    max="100"
                    value={formData?.activity}
                    onChange={(e) => handleInputChange('activity', e?.target?.value)}
                    placeholder="0-100%"
                    error={errors?.activity}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Notes</label>
                <textarea
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  placeholder="Additional notes about the animal..."
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  iconName={isSubmitting ? "Loader" : "Plus"}
                  iconPosition="left"
                >
                  {isSubmitting ? 'Adding...' : 'Add Animal'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddAnimalModal;