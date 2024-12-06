import React, { useState } from 'react';
import { Course } from '../../types';
import { Users, Video } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {course.category}
          </span>
        </div>
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.totalStudents} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            <span>{course.totalLectures} lectures</span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {course.progress}% complete
          </p>
        </div>
      </div>

      {/* Three-dot menu */}
      <div className="absolute top-2 right-2">
        <button
          className="p-1 rounded-full bg-white/80 hover:bg-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-more-vertical h-5 w-5 text-gray-600"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-40">
            <ul className="text-sm text-gray-700">
              <li
                onClick={() => {
                  onEdit(course);
                  setMenuOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Edit
              </li>
              <li
                onClick={() => {
                  onDelete(course.id);
                  setMenuOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Delete
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                View Details
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
