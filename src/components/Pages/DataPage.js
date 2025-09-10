import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, updatePost, deletePost, setCurrentPage, setSearchTerm } from '../../store/dataSlice';
import Table from '../UI/Table';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import PostForm from './PostForm';
 import ErrorMessage from '../UI/ErrorMessage';
import { showSuccess, showError, showDeleteConfirmation, showToast } from '../../utils/sweetAlert';

const DataPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, currentPage, postsPerPage, searchTerm } = useSelector(state => state.data);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');  

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await dispatch(fetchPosts());
      } catch (error) {
        console.error('Error loading posts:', error);
        showError('خطأ!', 'فشل في تحميل البيانات');
      }
    };
    
    loadPosts();
  }, [dispatch]);

   const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

   const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

     const columns = [
    {
      key: 'id',
      title: 'ID',
      render: (value) => `#${value}`
    },
    {
      key: 'title',
      title: 'Title',
      render: (value) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      )
    },
    {
      key: 'body',
      title: 'Content',
      render: (value) => (
        <div className="max-w-md truncate" title={value}>
          {value}
        </div>
      )
    },
    {
      key: 'userId',
      title: 'User',
      render: (value) => `User ${value}`
    }
  ];

   const handleAddPost = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

   const handleEditPost = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  // Delete post
  const handleDeletePost = async (post) => {
    const result = await showDeleteConfirmation(`المنشور "${post.title}"`);

    if (result.isConfirmed) {
      try {
        await dispatch(deletePost(post.id));
        
        // Show success alert
        showSuccess('تم الحذف!', 'تم حذف المنشور بنجاح');
        showToast('success', 'تم حذف المنشور بنجاح');
      } catch (error) {
        showError('خطأ!', 'فشل في حذف المنشور. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  // Save post (add or edit)
  const handleSavePost = async (postData) => {
    setIsSubmitting(true);
    try {
      if (editingPost) {
        await dispatch(updatePost(editingPost.id, postData));
        
        // Show success alert
        showSuccess('تم التحديث!', 'تم تحديث المنشور بنجاح');
        showToast('success', 'تم تحديث المنشور بنجاح');
      } else {
        await dispatch(addPost(postData));
        
        // Show success alert
        showSuccess('تم الإنشاء!', 'تم إنشاء منشور جديد بنجاح');
        showToast('success', 'تم إنشاء منشور جديد بنجاح');
      }
      setIsModalOpen(false);
    } catch (error) {
      showError('خطأ!', error.message || 'فشلت العملية. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // تغيير الصفحة
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // البحث
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Retry fetching posts
  const handleRetryFetch = () => {
    dispatch(fetchPosts());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Total Posts: {filteredPosts.length}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-3 sm:mt-0">
          <div className="mb-2 sm:mb-0">
            <Button onClick={handleAddPost}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Post
            </Button>
          </div>
          <Button 
            variant={sortOrder === 'asc' ? 'primary' : 'outline'} 
            onClick={() => setSortOrder('asc')}
            className="flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort ID Asc
          </Button>
          <Button 
            variant={sortOrder === 'desc' ? 'primary' : 'outline'} 
            onClick={() => setSortOrder('desc')}
            className="flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l-4-4m0 0l-4 4m4-4v12" />
            </svg>
            Sort ID Desc
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search in title or content..."
            className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && !loading && (
        <ErrorMessage
          title="Failed to load data"
          message={error}
          onRetry={handleRetryFetch}
        />
      )}

      {/* Table */}
      <Table
        columns={columns}
        data={currentPosts}
        loading={loading}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{indexOfFirstPost + 1}</span>
                {' '}to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastPost, filteredPosts.length)}
                </span>
                {' '}of{' '}
                <span className="font-medium">{filteredPosts.length}</span>
                {' '}results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-r-md"
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="rounded-none"
                    >
                      {page}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-l-md"
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Edit Post' : 'Add New Post'}
        size="lg"
      >
        <PostForm
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => setIsModalOpen(false)}
          loading={isSubmitting}
        />
      </Modal>

      </div>
  );
};

export default DataPage;