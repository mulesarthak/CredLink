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
import { Search, Filter, Download, Plus, ChevronDown, MoreHorizontal, Phone, Mail, MessageCircle, Calendar, TrendingUp, Users, Activity, Zap, Star, Clock, MapPin, Send, X } from 'lucide-react';

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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messageModal, setMessageModal] = useState<{isOpen: boolean, contact: Contact | null}>({isOpen: false, contact: null});
  const [messageText, setMessageText] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  // Handle direct message - open message modal
  const handleDirectMessage = (contact: Contact) => {
    setMessageModal({isOpen: true, contact});
    setMessageText('');
  };

  // Close message modal
  const handleCloseMessageModal = () => {
    setMessageModal({isOpen: false, contact: null});
    setMessageText('');
  };

  // Send message and navigate to inbox
  const handleSendMessage = () => {
    if (!messageText.trim() || !messageModal.contact) return;
    
    // Store the conversation data for inbox page
    const conversationData = {
      contact: messageModal.contact,
      initialMessage: messageText,
      timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('newConversation', JSON.stringify(conversationData));
    
    // Close modal
    handleCloseMessageModal();
    
    // Navigate to inbox page
    window.location.href = '/dashboard/inbox';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      
      // Check if click is inside filter button or dropdown
      const isFilterButton = filterRef.current && filterRef.current.contains(target);
      const isFilterDropdown = target.closest('[data-filter-dropdown]');
      
      if (!isFilterButton && !isFilterDropdown && isFilterOpen) {
        setIsFilterOpen(false);
      }
      
      // Close action dropdown when clicking outside
      if (!target.closest('.relative')) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

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

  // Handle contact click to open sidebar
  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsSidebarOpen(true);
  };

  // Handle sidebar close
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedContact(null);
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
      
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12" style={{overflow: 'visible'}}>
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-white"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto" style={{overflow: 'visible'}}>
            {/* Header Section - Mobile First */}
            <div className="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0" style={{overflow: 'visible'}}>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                  My Professional{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Connections</span>
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Manage and grow your connections</p>
              </div>
              
              {/* Stats and Controls - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6" style={{overflow: 'visible'}}>
                <div className="flex flex-col items-center text-center bg-gray-50 px-4 py-2 rounded-lg">
                 
                </div>
                
                <div className="flex flex-col gap-4 w-full sm:w-auto" style={{overflow: 'visible'}}>
                  {/* Mobile: Filter first, then Toggle */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    {/* Filter - Mobile First - Hide when virtual card sidebar is open */}
                    {!isSidebarOpen && (
                      <div className="relative order-1 sm:order-2 w-full sm:w-auto" ref={filterRef} style={{zIndex: 10000}}>
                        <button 
                          onClick={() => setIsFilterOpen(!isFilterOpen)}
                          className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-3 hover:bg-gray-50 rounded-lg transition-colors w-full sm:w-auto bg-white border border-gray-200 shadow-sm"
                        >
                          <Filter className="w-5 h-5 sm:w-6 sm:w-6" />
                          <span className="text-sm font-medium">Filters</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    )}
                    
                    {/* View Toggle - Mobile Second */}
                    <div className="relative flex items-center bg-white rounded-xl p-1.5 shadow-lg border border-gray-200 w-full sm:w-auto order-2 sm:order-1" style={{minWidth: '320px', height: '40px'}}>
                      <div 
                        className={`absolute top-1.5 bottom-1.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg transition-all duration-300 ease-out ${
                          viewMode === 'table' ? 'left-1.5 right-1/2' : 'left-1/2 right-1.5'
                        }`}
                      />
                      <button 
                        onClick={() => setViewMode('table')}
                        className={`relative z-10 flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 rounded-lg ${
                          viewMode === 'table' 
                            ? 'text-white' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9" />
                          </svg>
                          Table View
                        </span>
                      </button>
                      <button 
                        onClick={() => setViewMode('cards')}
                        className={`relative z-10 flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 rounded-lg ${
                          viewMode === 'cards' 
                            ? 'text-white' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                          </svg>
                          Cards View
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mt-6 sm:mt-8 lg:mt-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-lg sm:shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 sm:pl-5">
                     
                    </div>
                    <input
                      type="text"
                      placeholder="Search your professional network..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full py-3 sm:py-4 lg:py-5 pl-12 sm:pl-14 lg:pl-16 pr-4 sm:pr-20 lg:pr-24 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 text-base sm:text-lg lg:text-xl font-medium focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                    />
                    {searchTerm && (
                      <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 lg:pr-6 flex items-center">
                        <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-purple-200">
                          {sortedContacts.length} found
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Insights Panel */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200" style={{marginTop: '40px'}}>
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
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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
                    <th className="text-gray-900" style={{padding: '20px 24px', fontSize: '16px', fontWeight: '500'}}>
                      <div className="flex items-center gap-3">
                        DATE 
                        
                      </div>
                    </th>
                    <th className="text-gray-900" style={{padding: '20px 24px', fontSize: '16px', fontWeight: '500'}}>
                      
                    </th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {sortedContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    <td style={{padding: '20px 24px'}}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold" style={{fontSize: '14px'}}>
                            {sortedContacts.indexOf(contact) + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setIsSidebarOpen(true);
                          }}
                          className="text-left hover:text-blue-600 transition-colors"
                        >
                          {contact.name}
                        </button>
                      </div>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <span className="text-gray-600" style={{fontSize: '15px'}}>{contact.title}</span>
                    </td>
                    <td style={{padding: '20px 24px'}}>
                      <span className="text-gray-600" style={{fontSize: '15px'}}>{contact.company}</span>
                    </td>
                    <td className="text-gray-900" style={{padding: '20px 24px', fontSize: '16px', fontWeight: '500'}}>
                      <span>{contact.dateAdded}</span>
                    </td>
                    <td className="text-gray-900" style={{padding: '20px 24px', fontSize: '16px', fontWeight: '500'}}>
                      <button
                        onClick={() => handleDirectMessage(contact)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-700 text-sm font-medium hover:text-blue-900 transition-colors"
                      >
                        Message
                      </button>
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

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {sortedContacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {sortedContacts.indexOf(contact) + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.title}</p>
                        <p className="text-sm text-gray-500 truncate">{contact.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{contact.dateAdded}</span>
                          <button
                            onClick={() => handleDirectMessage(contact)}
                            className="inline-flex items-center gap-1 px-2 py-0.5  text-blue-700 rounded-full text-xs font-medium  transition-colors"
                          >
                            
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === contact.id ? null : contact.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        
                        {openDropdown === contact.id && (
                          <div className="absolute right-0 top-8 w-48 bg-white shadow-lg border border-gray-200 rounded-lg py-2 z-10">
                            
                            
                            <button 
                              onClick={() => handleDeleteConnection(contact.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Connection
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Info Display for Mobile */}
                  {showContactInfo[contact.id]?.type && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">
                          {showContactInfo[contact.id]?.type === 'phone' ? 'Phone: ' : 'Email: '}
                        </span>
                        <span className="text-gray-600">
                          {showContactInfo[contact.id]?.type === 'phone' ? contact.phone : contact.email}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                {sortedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredCard(contact.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Container with 3D Flip Effect */}
                    <div className="relative w-full h-48 sm:h-56 lg:h-64 perspective-1000">
                      <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                        hoveredCard === contact.id ? 'rotate-y-180' : ''
                      }`}>
                        
                        {/* Front of Card */}
                        <div className={`absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl shadow-lg border p-3 sm:p-4 lg:p-6 transition-all duration-300 group hover:shadow-xl hover:scale-105 ${
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
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-xl xl:text-2xl mb-1 sm:mb-2 lg:mb-3 group-hover:text-gray-800 transition-colors duration-300 px-1">{contact.name}</h3>
                            <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 mb-1 sm:mb-2 group-hover:text-gray-700 transition-colors duration-300 px-1">{contact.title}</p>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-500 mb-2 sm:mb-4 lg:mb-6 group-hover:text-gray-600 transition-colors duration-300 px-1">{contact.company}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                              {contact.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group-hover:scale-110 ${getTagColor(tag)}`}
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
                              <button 
                                onClick={() => handleDirectMessage(contact)}
                                className="absolute bottom-4 right-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 flex items-center justify-center"
                              >
                                <Send className="w-5 h-5" />
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

        {/* Virtual Card Sidebar */}
        {isSidebarOpen && selectedContact && (
            <>
              {/* Invisible overlay for click-outside-to-close */}
              <div 
                className="fixed inset-0 z-40"
                onClick={handleCloseSidebar}
              />
              
              <div 
                className="fixed right-0 top-0 h-full w-96 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
                style={{
                  background: 'linear-gradient(to top, #2dd4bf, #0891b2, #0e7490)'
                }}
              >

              {/* Card Content */}
              <div className="h-full flex flex-col text-white" style={{ padding: '24px 40px 32px 10px' }}>
                {/* Header Image */}
                <div className="relative" style={{ marginBottom: '20px', paddingTop: '10px' }}>
                  <div 
                    className="w-full rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                      height: '128px',
                      marginBottom: '16px',
                      backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`,
                      border: '4px solid white',
                      margin: '0 16px 0 24px'
                    }}
                  >
                  </div>
                  
                  {/* Profile Picture */}
                  {/* 
                    PROFILE POSITION CONTROL:
                    Change the profileLeftPosition value below to move the profile image:
                    - '25%' for left position
                    - '50%' for center position (default)
                    - '75%' for right position
                    - Any custom percentage like '30%', '60%', etc.
                  */}
                  <div 
                    className="absolute transition-all duration-300 ease-in-out" 
                    style={{ 
                      bottom: '-80px',
                      left: '50%', // ← Change this value to move profile: '25%' (left), '50%' (center), '75%' (right)
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="rounded-full shadow-lg overflow-hidden border-4 border-white" style={{ width: '150px', height: '150px' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.currentTarget as HTMLImageElement;
                          const fallback = target.nextElementSibling as HTMLElement;
                          target.style.display = 'none';
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-white rounded-full hidden items-center justify-center">
                        <span className="text-teal-600 text-2xl font-bold">
                          {getInitials(selectedContact.name)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-center" style={{ marginTop: '72px', marginBottom: '32px' }}>
                  <h2 className="text-3xl font-bold mb-2">{selectedContact.name}</h2>
                  <p className="text-xl mb-1">{selectedContact.title} | {selectedContact.company}</p>
                  <p className="text-lg opacity-90">{selectedContact.location || 'California, USA'}</p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4" style={{ marginBottom: '32px' }}>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.173 4.71C13.938 14.146 12.4 14.8 10.76 14.8c-.779 0-1.518-.122-2.194-.342-.676-.22-1.277-.538-1.794-.95-.517-.412-.925-.9-1.225-1.464C5.247 11.48 5.097 10.86 5.097 10.2c0-.66.15-1.28.45-1.844.3-.564.708-1.052 1.225-1.464.517-.412 1.118-.73 1.794-.95.676-.22 1.415-.342 2.194-.342 1.64 0 3.178.654 4.635 1.93 1.277 1.277 2.004 2.852 2.173 4.71z"/>
                    </svg>
                  </div>
                </div>

                {/* Description */}
                <div className="text-center" style={{ marginBottom: '32px', padding: '0 16px' }}>
                  <p className="text-sm opacity-90 leading-relaxed ">
                    A modern digital visiting card for {selectedContact.title.toLowerCase()} showcasing professional details, social links, and portfolio
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  {/* Primary Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-12">
                    <button className="bg-white/90 backdrop-blur-sm text-black py-2 sm:py-3 px-2 sm:px-3 rounded text-xs sm:text-sm font-semibold hover:bg-white/30 transition-all text-center">
                      Services
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm text-black py-2 sm:py-3 px-2 sm:px-3 rounded text-xs sm:text-sm font-semibold hover:bg-white/30 transition-all text-center">
                      Portfolio
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm text-black py-2 sm:py-3 px-2 sm:px-3 rounded text-xs sm:text-sm font-semibold hover:bg-white/30 transition-all text-center">
                      Links
                    </button>
                  </div>

                  {/* Secondary Action Buttons - Separated */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/20">
                    <button className="bg-white/80 backdrop-blur-sm text-black py-2 sm:py-3 px-3 sm:px-4 rounded text-xs sm:text-sm font-semibold hover:bg-white/40 transition-all text-center shadow-sm">
                      Experience
                    </button>
                    <button className="bg-white/80 backdrop-blur-sm text-black py-2 sm:py-3 px-3 sm:px-4 rounded text-xs sm:text-sm font-semibold hover:bg-white/40 transition-all text-center shadow-sm">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </>
        )}

        {/* Filter Dropdown Portal - Hide when virtual card sidebar is open */}
          {isFilterOpen && !isSidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-[9999]"
              onClick={() => setIsFilterOpen(false)}
            />
            
            {/* Dropdown */}
            <div 
              className="fixed bg-white shadow-2xl border border-gray-200 rounded-lg overflow-hidden z-[9999]"
              style={{
                top: '140px',
                right: '40px',
                width: '288px'
              }}
              data-filter-dropdown
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 text-center">Sort Options</h3>
                
                {/* Sort Options */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {[
                    { value: 'name', label: 'Sort by A to Z' },
                    { value: 'date', label: 'Sort by Date' },
                    { value: 'recent', label: 'Sort by Recent' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center p-2 sm:p-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sortOption"
                        value={option.value}
                        checked={selectedSortOption === option.value}
                        onChange={(e) => {
                          setSelectedSortOption(e.target.value);
                        }}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 border-gray-300 focus:ring-purple-500 mr-3"
                      />
                      <span className="text-sm font-medium text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>

                {/* Apply Button */}
                <button 
                  onClick={() => {
                    setSortBy(selectedSortOption);
                    setIsFilterOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </>
        )}

        {/* Message Modal */}
        {messageModal.isOpen && messageModal.contact && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-50"
              onClick={handleCloseMessageModal}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white  shadow-2xl max-w-2xl w-full  rounded-sm max-h-[80vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-center border-b border-gray-200" >
                  <div className="flex items-center gap-6" >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Send Message to {messageModal.contact.name}
                      </h3>
                     
                    </div>
                  </div>
                  <button
                    onClick={handleCloseMessageModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                   
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex justify-center" style={{padding: '24px'}}>
                  <div className="mb-4 w-full max-w-lg">
                    
                    <div className="flex justify-center">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder={`Hi ${messageModal.contact.name},`}
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 bg-gray-50" style={{padding: '24px 32px 32px 32px'}}>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="w-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      
                      Send Message
                    </button>
                    <button
                      onClick={handleCloseMessageModal}
                      className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}