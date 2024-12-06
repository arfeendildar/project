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



const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [newCourse, setNewCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    category: '',
    thumbnail: '',
    totalStudents: 0,
    totalLectures: 0,
    progress: 0
  });

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.category) {
      setCourses([...courses, { ...newCourse, id: String(courses.length + 1) }]);
      setIsPopupOpen(false);
      resetNewCourse();
    } else {
      alert('Please fill in all required fields.');
    }
  };



  const resetNewCourse = () => {
    setNewCourse({
      id: '',
      title: '',
      description: '',
      category: '',
      thumbnail: '',
      totalStudents: 0,
      totalLectures: 0,
      progress: 0
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Course
        </button>
      </div>

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

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Course</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
