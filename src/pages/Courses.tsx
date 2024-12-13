import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import CourseCard from '../components/courses/CourseCard';
import { Course } from '../types';

const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    totalStudents: 156,
    totalLectures: 24,
    progress: 85
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data science, statistics, and machine learning.',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    totalStudents: 89,
    totalLectures: 18,
    progress: 60
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn modern design principles and create beautiful user interfaces.',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
    totalStudents: 124,
    totalLectures: 20,
    progress: 40
  }
];

const categories = ['All', 'Development', 'Data Science', 'Design', 'Business', 'Marketing'];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    category: categories[1],
    thumbnail: '',
    totalStudents: 0,
    totalLectures: 0,
    progress: 0,
  });

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      alert('Please provide valid course details.');
      return;
    }
    setCourses([...courses, { ...newCourse, id: `${Date.now()}` }]);
    setShowModal(false);
    setNewCourse({
      id: '',
      title: '',
      description: '',
      category: categories[1],
      thumbnail: '',
      totalStudents: 0,
      totalLectures: 0,
      progress: 0,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-5 w-5" />
          Create Course
        </button>
      </div>

      {/* Add Course Modal */}
      {showModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-60">
      <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Title</label>
        <input
          type="text"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Description</label>
        <textarea
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Category</label>
        <select
          value={newCourse.category}
          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        >
          {categories.slice(1).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg" onClick={handleAddCourse}>
          Add Course
        </button>
      </div>
    </div>
  </div>
)}


      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
