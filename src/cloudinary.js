import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dquqwvmhh'
  }
});

export { cld };

// Upload function using fetch (no SDK needed for upload)
export const uploadToCloudinary = async (file, folder = 'blog-images') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'char-kulture-blog'); // Create this in Cloudinary dashboard
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dquqwvmhh/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      filename: data.original_filename
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  // Note: Deleting requires server-side implementation with API secret
  // For now, you can manage deletions through Cloudinary dashboard
  console.log('Delete image with public_id:', publicId);
};