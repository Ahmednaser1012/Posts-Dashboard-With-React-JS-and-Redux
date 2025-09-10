import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';

const PostForm = ({ post, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        body: post.body || '',
        userId: post.userId || 1
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // مسح الخطأ عند التعديل
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
    } else if (formData.body.trim().length < 10) {
      newErrors.body = 'Content must be at least 10 characters';
    }
    
    if (!formData.userId || formData.userId < 1) {
      newErrors.userId = 'User ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        title: formData.title.trim(),
        body: formData.body.trim(),
        userId: parseInt(formData.userId)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter post title"
          disabled={loading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
          Content *
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          value={formData.body}
          onChange={handleChange}
          className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none ${
            errors.body ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter post content"
          disabled={loading}
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body}</p>
        )}
      </div>

      {/* User ID */}
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
          User ID *
        </label>
        <input
          type="number"
          id="userId"
          name="userId"
          min="1"
          value={formData.userId}
          onChange={handleChange}
          className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
            errors.userId ? 'border-red-300' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.userId && (
          <p className="mt-1 text-sm text-red-600">{errors.userId}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {post ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;