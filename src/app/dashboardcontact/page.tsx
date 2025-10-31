'use client';

import { useState, useEffect, useRef } from 'react';

// Add custom CSS for 3D flip effect
const flipCardStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = flipCardStyles;
  document.head.appendChild(styleSheet);
}
import { Search, Filter, Download, Plus, ChevronDown, MoreHorizontal, Phone, Mail, MessageCircle, Calendar, TrendingUp, Users, Activity, Zap, Star, Clock, MapPin } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  title: string;
  company: string;
  tags: string[];
  associatedCard: string;
  dateAdded: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  lastInteraction?: string;
  relationshipScore?: number;
  activityStatus?: 'active' | 'inactive' | 'new';
  meetingCount?: number;
  responseRate?: number;
}

// Enhanced sample contact data
const contactsData: Contact[] = [
  {
    id: 1,
    name: "Leo Garcia",
    title: "Full Stack Developer",
    company: "CredLink",
    tags: ["Personal"],
    associatedCard: "Personal",
    dateAdded: "2024-10-30",
    email: "leo@credlink.com",
    phone: "+1 (555) 123-4567",
    location: "Mumbai, India",
    lastInteraction: "2024-10-29",
    activityStatus: "active",
    
  },
  {
    id: 2,
    name: "John Smith",
    title: "Software Engineer",
    company: "Tech Corp",
    tags: [ "Tech"],
    associatedCard: "Work",
    dateAdded: "2024-10-25",
    email: "john@techcorp.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    lastInteraction: "2024-10-28",
    activityStatus: "active",

  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Marketing Manager",
    company: "Creative Agency",
    tags: [ "Marketing"],
    associatedCard: "Business",
    dateAdded: "2024-10-20",
    email: "sarah@creative.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    lastInteraction: "2024-10-15",
    activityStatus: "inactive",
  },
  {
    id: 4,
    name: "Mike Davis",
    title: "Product Designer",
    company: "Design Studio",
    tags: [ "Design"],
    associatedCard: "Creative",
    dateAdded: "2024-10-15",
    email: "mike@designstudio.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    lastInteraction: "2024-10-30",
    activityStatus: "active",
  },
  {
    id: 5,
    name: "Emily Chen",
    title: "Data Scientist",
    company: "Analytics Inc",
    tags: ["Professional"],
    associatedCard: "Professional",
    dateAdded: "2024-10-10",
    email: "emily@analytics.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    lastInteraction: "2024-10-25",
    
    activityStatus: "active",
  
  },
  {
    id: 6,
    name: "Alex Rodriguez",
    title: "Sales Director",
    company: "Sales Solutions",
    tags: ["Business"],
    associatedCard: "Business",
    dateAdded: "2024-10-05",
    email: "alex@sales.com",
    phone: "+1 (555) 678-9012",
    location: "Miami, FL",
    lastInteraction: "2024-09-20",
   
    activityStatus: "inactive",
    
  },
  {
    id: 7,
    name: "Lisa Wang",
    title: "UX Researcher",
    company: "User Labs",
    tags: ["Creative"],
    associatedCard: "Creative",
    dateAdded: "2024-09-30",
    email: "lisa@userlabs.com",
    phone: "+1 (555) 789-0123",
    location: "Portland, OR",
    lastInteraction: "2024-10-28",
   
    activityStatus: "active",
    
  },
  {
    id: 8,
    name: "David Brown",
    title: "DevOps Engineer",
    company: "Cloud Systems",
    tags: ["Technical"],
    associatedCard: "Technical",
    dateAdded: "2024-10-12",
    email: "david@cloudsys.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, CO",
    lastInteraction: "2024-10-26",
    
    activityStatus: "new",
  
  }
];

export default function DashboardContactPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('name');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showContactInfo, setShowContactInfo] = useState<{[key: number]: {type: 'phone' | 'email' | null}}>({});
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [contactsList, setContactsList] = useState<Contact[]>(contactsData);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      // Close action dropdown when clicking outside
      const target = event.target as Element;
      if (!target.closest('.relative')) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle showing contact info
  const handleContactInfo = (contactId: number, type: 'phone' | 'email') => {
    setShowContactInfo(prev => ({
      ...prev,
      [contactId]: { type: prev[contactId]?.type === type ? null : type }
    }));
  };

  // Handle delete connection
  const handleDeleteConnection = (contactId: number) => {
    setContactsList(prev => prev.filter(contact => contact.id !== contactId));
    setOpenDropdown(null);
  };

  // Filter contacts based on search term
  const filteredContacts = contactsList.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case 'recent':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Personal': 'bg-purple-100 text-purple-700',
      'Business': 'bg-blue-100 text-blue-700',
      'Professional': 'bg-green-100 text-green-700',
      'Creative': 'bg-orange-100 text-orange-700',
      'Technical': 'bg-gray-100 text-gray-700'
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden" style={{padding: '40px 32px'}}>
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative group w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30 cursor-pointer transition-all duration-300 hover:scale-105">
                      <div className="w-12 h-12 bg-gradient-to-br from-white to-purple-100 rounded-xl flex items-center justify-center shadow-inner">
                        <span className="text-purple-600 text-lg font-bold">SM</span>
                      </div>
                      
                      {/* Hover Tooltip */}
                     
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                        My Professional 
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Connections</span>
                      </h1>
                      <p className="text-gray-600 text-lg">Manage and grow your connections</p>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-gray-900">{contactsList.length}</div>
                  <div className="text-gray-600 text-sm">Total Contacts</div>
                </div>
                
                <div className="flex items-center gap-3">
                  
                  {/* View Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                    <button 
                      onClick={() => setViewMode('table')}
                      className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                        viewMode === 'table' 
                          ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Table
                    </button>
                    <button 
                      onClick={() => setViewMode('cards')}
                      className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                        viewMode === 'cards' 
                          ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Cards
                    </button>
                  </div>
                  
                  <div className="relative" ref={filterRef}>
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-200 shadow-lg hover:shadow-xl"
                    >
                      <Filter className="w-5 h-5" />
                      <span className="hidden sm:inline">Filters</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                      <div className="fixed top-20 right-8 w-72 h-80 bg-white shadow-2xl border border-gray-200 overflow-hidden" style={{zIndex: 99999, borderRadius: '5px'}}>
                        <div className="p-6 h-full flex flex-col">
                          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sort Options</h3>
                          
                          {/* Sort Options */}
                          <div className="flex-1" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                            {[
                              { value: 'name', label: 'Sort by A to Z' },
                              { value: 'date', label: 'Sort by Date' },
                              { value: 'recent', label: 'Sort by Recent' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center cursor-pointer rounded-xl hover:bg-gray-50 transition-colors" style={{padding: '16px', gap: '16px'}}>
                                <input
                                  type="radio"
                                  name="sortOption"
                                  value={option.value}
                                  checked={selectedSortOption === option.value}
                                  onChange={(e) => setSelectedSortOption(e.target.value)}
                                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                                />
                                <div className="flex items-center" style={{gap: '12px'}}>
                                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                                </div>
                              </label>
                            ))}
                          </div>

                          {/* Apply Button */}
                          <button 
                            onClick={() => {
                              setSortBy(selectedSortOption);
                              setIsFilterOpen(false);
                            }}
                            className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 mt-6"
                          >
                            Apply Filter
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mt-12 mb-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" style={{paddingLeft: '20px'}}>
                      <Search className="h-6 w-6 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search your professional network..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full py-5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 text-xl font-medium focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300"
                      style={{paddingLeft: '60px', paddingRight: '80px'}}
                    />
                    {searchTerm && (
                      <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                        <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl text-sm font-semibold border border-purple-200">
                          {sortedContacts.length} found
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Search suggestions or quick filters could go here */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Insights Panel */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="px-8 py-6">
            
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Relationship Health */}
              

              {/* Inactive Contacts */}
              

              {/* Top Performers */}
              
            </div>

            {/* Quick Actions */}
            
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'table' ? (
          /* Table View */
          <div className="bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left text-gray-500 uppercase tracking-wider" style={{padding: '20px 24px', fontSize: '14px', fontWeight: '600'}}>
                    <div className="flex items-center gap-2">
                      NAME
                     
                    </div>
                  </th>
                  <th className="text-left text-gray-500 uppercase tracking-wider" style={{padding: '20px 24px', fontSize: '14px', fontWeight: '600'}}>
                    <div className="flex items-center gap-2">
                      TITLE
                      
                    </div>
                  </th>
                  <th className="text-left text-gray-500 uppercase tracking-wider" style={{padding: '20px 24px', fontSize: '14px', fontWeight: '600'}}>
                    <div className="flex items-center gap-2">
                      COMPANY
                     
                    </div>
                  </th>
                  <th className="text-left text-gray-500 uppercase tracking-wider" style={{padding: '20px 24px', fontSize: '14px', fontWeight: '600'}}>
                    TAGS
                  </th>
                  <th className="text-left text-gray-500 uppercase tracking-wider" style={{padding: '20px 24px', fontSize: '14px', fontWeight: '600'}}>
                    <div className="flex items-center gap-2">
                      ASSOCIATED CARD
                      
                    </div>
                  </th>
                  <th className="text-left text-gray-500 uppercase tracking-wider" style={{padding: '20px 24px', fontSize: '14px', fontWeight: '600'}}>
                    <div className="flex items-center gap-2">
                      DATE 
                      
                    </div>
                  </th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    <td style={{padding: '20px 24px'}}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium" style={{fontSize: '14px'}}>
                            {getInitials(contact.name)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900" style={{fontSize: '16px'}}>{contact.name}</span>
                      </div>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <span className="text-gray-600" style={{fontSize: '15px'}}>{contact.title}</span>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <span className="text-gray-600" style={{fontSize: '15px'}}>{contact.company}</span>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <div className="flex gap-2">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center rounded-full font-medium ${getTagColor(tag)}`}
                            style={{padding: '6px 12px', fontSize: '13px'}}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <span className="text-gray-600" style={{fontSize: '15px'}}>{contact.associatedCard}</span>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <span className="text-gray-600" style={{fontSize: '15px'}}>{formatDate(contact.dateAdded)}</span>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === contact.id ? null : contact.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openDropdown === contact.id && (
                          <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button
                              onClick={() => handleDeleteConnection(contact.id)}
                              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Connection
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              1 - {Math.min(sortedContacts.length, contactsList.length)} of {contactsList.length} contacts
            </p>
          </div>
        </div>
        ) : (
          /* Cards View */
          <div className="bg-gray-50 min-h-screen">
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredCard(contact.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Container with 3D Flip Effect */}
                    <div className="relative w-full h-64 perspective-1000">
                      <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                        hoveredCard === contact.id ? 'rotate-y-180' : ''
                      }`}>
                        
                        {/* Front of Card */}
                        <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-lg border p-6 transition-all duration-300 group hover:shadow-xl hover:scale-105 ${
                          contact.id % 4 === 1 ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 hover:from-purple-100 hover:to-blue-100 hover:border-purple-300' :
                          contact.id % 4 === 2 ? 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:from-green-100 hover:to-teal-100 hover:border-green-300' :
                          contact.id % 4 === 3 ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100 hover:border-orange-300' :
                          'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300'
                        }`}>
                          
                          {/* Decorative Elements */}
                          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                            <div className={`w-8 h-8 rounded-full ${
                              contact.id % 4 === 1 ? 'bg-purple-300' :
                              contact.id % 4 === 2 ? 'bg-green-300' :
                              contact.id % 4 === 3 ? 'bg-orange-300' :
                              'bg-indigo-300'
                            }`}></div>
                          </div>
                          
                          <div className="flex flex-col h-full justify-center items-center text-center relative z-10">
                            {/* Name and Title */}
                            <h3 className="font-semibold text-gray-900 text-2xl mb-3 group-hover:text-gray-800 transition-colors duration-300">{contact.name}</h3>
                            <p className="text-lg text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">{contact.title}</p>
                            <p className="text-base text-gray-500 mb-6 group-hover:text-gray-600 transition-colors duration-300">{contact.company}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 justify-center">
                              {contact.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-110 ${getTagColor(tag)}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Back of Card - Different templates based on contact ID */}
                        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-lg text-white ${
                          contact.id % 4 === 1 ? 'bg-gradient-to-br from-purple-600 to-blue-600' :
                          contact.id % 4 === 2 ? 'bg-gradient-to-br from-green-600 to-teal-600' :
                          contact.id % 4 === 3 ? 'bg-gradient-to-br from-orange-600 to-red-600' :
                          'bg-gradient-to-br from-indigo-600 to-purple-600'
                        }`} style={{padding: '24px'}}>
                          <div className="flex flex-col h-full justify-center items-center">
                            <div className="text-center" style={{marginBottom: '24px'}}>
                              <h3 className="font-semibold text-xl mb-2">{contact.name}</h3>
                              <p className="text-white/80 text-sm">Quick Actions</p>
                              {/* Contact Info Display */}
                              {showContactInfo[contact.id]?.type && (
                                <div className="mt-3 p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                  <p className="text-white text-sm font-medium">
                                    {showContactInfo[contact.id]?.type === 'phone' ? contact.phone : contact.email}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons - All templates use same circular layout */}
                            <div className="relative w-40 h-40">
                              <button 
                                onClick={() => handleContactInfo(contact.id, 'phone')}
                                className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 flex items-center justify-center ${
                                  showContactInfo[contact.id]?.type === 'phone' ? 'bg-white/40' : 'bg-white/20'
                                }`}
                              >
                                <Phone className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleContactInfo(contact.id, 'email')}
                                className={`absolute bottom-4 left-0 w-12 h-12 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 flex items-center justify-center ${
                                  showContactInfo[contact.id]?.type === 'email' ? 'bg-white/40' : 'bg-white/20'
                                }`}
                              >
                                <Mail className="w-5 h-5" />
                              </button>
                              <button className="absolute bottom-4 right-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {sortedContacts.length === 0 && (
          <div className="text-center py-12 bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}