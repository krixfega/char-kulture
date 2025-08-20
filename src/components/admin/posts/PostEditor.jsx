import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const PostEditor = ({ 
  showEditor, 
  setShowEditor, 
  editingPost, 
  setEditingPost, 
  onSave, 
  onImageUpload 
}) => {
  const [formData, setFormData] = useState(() => ({
    title: '',
    excerpt: '',
    content: '',
    category: 'recipes',
    tags: '',
    featuredImage: '',
    published: false
  }));

  const [uploadError, setUploadError] = useState('');
  const [localUploading, setLocalUploading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Populate form when editing a post
  useEffect(() => {
    if (editingPost) {
      console.log('📝 Populating form for editing:', editingPost);
      setFormData({
        title: editingPost.title || '',
        excerpt: editingPost.excerpt || '',
        content: parseContentForEditing(editingPost.content) || '', // Convert HTML back to plain text
        category: editingPost.category || 'recipes',
        tags: Array.isArray(editingPost.tags) ? editingPost.tags.join(', ') : editingPost.tags || '',
        featuredImage: editingPost.featuredImage || '',
        published: editingPost.published || false
      });
    } else {
      // Reset form for new post
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'recipes',
        tags: '',
        featuredImage: '',
        published: false
      });
    }
  }, [editingPost, showEditor]);


  const categories = [
    { id: 'recipes', name: 'Recipes' },
    { id: 'events', name: 'Events' },
    { id: 'behind-scenes', name: 'Behind the Scenes' },
    { id: 'tips', name: 'Cooking Tips' },
    { id: 'ingredients', name: 'Ingredients' }
  ];

  const formatContentForDisplay = (content) => {
    if (!content) return '';
    // Convert line breaks to HTML <br> tags and preserve paragraphs
    return content
      .split('\n\n')  // Split by double line breaks (paragraphs)
      .map(paragraph => 
        paragraph
          .split('\n')  // Split by single line breaks
          .join('<br>')  // Convert to <br> tags
      )
      .map(paragraph => `<p>${paragraph}</p>`)  // Wrap in <p> tags
      .join('');
  };

  const parseContentForEditing = (htmlContent) => {
    if (!htmlContent) return '';
    // Convert HTML back to plain text with line breaks
    return htmlContent
      .replace(/<\/p><p>/g, '\n\n')  // Double line breaks between paragraphs
      .replace(/<br\s*\/?>/g, '\n')   // Single line breaks
      .replace(/<\/?p>/g, '')         // Remove p tags
      .trim();
  };

  const handleImageUploadForEditor = async (event) => {
    console.log('🖼️ Image upload started');
    const file = event.target.files[0];
    if (!file) return;

    setUploadError('');
    setLocalUploading(true);
    setIsUploadingImage(true);
    
    try {
      console.log('📤 Calling onImageUpload...');
      const imageUrl = await onImageUpload(file);
      console.log('✅ Image upload completed:', imageUrl);
      
      if (imageUrl) {
        console.log('🔄 Updating formData with image URL');
        setFormData(prevData => ({
          ...prevData,
          featuredImage: imageUrl
        }));
        toast.success('📸 Image uploaded successfully!')
        console.log('✅ FormData updated, NOT saving post');
      } else {
        setUploadError('Failed to upload image. Please try again.');
        toast.error('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Error uploading image. Please try again.');
      toast.error('Error uploading image. Please try again.');
    } finally {
      setLocalUploading(false);
      setTimeout(() => {
        setIsUploadingImage(false);
        console.log('🔚 Image upload process ended');
      }, 100);
    }
  };

  const handleSave = async (e) => {
    console.log('💾 SAVE TRIGGERED - handleSave called');

    if (isUploadingImage) {
      console.log('🚫 Save prevented - still uploading image');
      toast.error('Please wait for the image to finish uploading before saving.');
      return;
    }

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('📝 Saving post with data:', formData);
    
    try {
      const postData = {
        ...formData,
        content: formatContentForDisplay(formData.content), 
        // Handle tags properly - check if it's already processed
        tags: typeof formData.tags === 'string' 
          ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          : formData.tags,
        featuredImage: formData.featuredImage || ''
      };

      await onSave(postData, editingPost);
      toast.success(
        editingPost ? 'Post updated successfully!' : 'New post created successfully!'
      );
      console.log('✅ Post saved successfully');
      setShowEditor(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(
        editingPost ? 'Error updating post. Please try again.' : 'Error creating post. Please try again.'
      );
    }
  };

  if (!showEditor) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="sticky top-0 bg-white border-b border-[var(--accent)]/20 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl lg:text-2xl font-playball text-[var(--text-dark)]">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowEditor(false);
                setEditingPost(null);
              }}
              className="text-[var(--text-dark)]/70 hover:text-[var(--text-dark)] p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 lg:p-6">
          {/* Use actual form element for proper form handling */}
          <form 
            onSubmit={(e) => {
              console.log('🛑 Form submit prevented');
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                className="w-full p-3 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none font-sans"
                placeholder="Enter post title..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                  className="w-full p-3 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none font-sans"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value}))}
                  className="w-full p-3 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none font-sans"
                  placeholder="pasta, italian, easy..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
                rows={3}
                className="w-full p-3 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none font-sans"
                placeholder="Brief description of the post..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Featured Image (Optional)
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImageUploadForEditor(e);
                  }}
                  className="w-full p-3 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none font-sans"
                  disabled={localUploading}
                />
                {localUploading && (
                  <div className="flex items-center gap-2 text-[var(--dark-btn)]">
                    <div className="w-4 h-4 border-2 border-[var(--dark-btn)] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-sans">Uploading to Cloudinary...</span>
                  </div>
                )}
                {uploadError && (
                  <div className="text-red-600 text-sm font-sans">
                    {uploadError}
                  </div>
                )}
                {formData.featuredImage && (
                  <div className="relative">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg border border-[var(--accent)]/20"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFormData(prev => ({...prev, featuredImage: ''}));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Content
              </label>
              <p className="text-xs text-[var(--text-dark)]/70 mb-2 font-sans">
                Write naturally - line breaks will be preserved. Double line breaks create new paragraphs.
              </p>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
                rows={12}
                className="w-full p-3 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none font-mono text-sm"
                placeholder="Write your post content here... 
                Use line breaks for new lines and double line breaks for new paragraphs."
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({...prev, published: e.target.checked}))}
                  className="w-4 h-4 text-[var(--dark-btn)] border-[var(--accent)] rounded focus:ring-[var(--dark-btn)]"
                />
                <span className="text-sm font-semibold text-[var(--text-dark)] font-sans">
                  Publish immediately
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Buttons outside the form */}
        <div className="px-4 lg:px-6 pb-4 lg:pb-6">
          <div className="flex justify-end gap-4 pt-4 border-t border-[var(--accent)]/20">
            <motion.button
              type="button"
              onClick={() => {
                setShowEditor(false);
                setEditingPost(null);
              }}
              className="px-6 py-2 border border-[var(--accent)] rounded-lg text-[var(--text-dark)] hover:bg-[var(--accent)]/10 transition-colors duration-200 font-sans"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-[var(--dark-btn)] text-[var(--btn-text)] rounded-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center gap-2 font-sans"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-4 h-4" />
              {editingPost ? 'Update' : 'Create'} Post
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostEditor;