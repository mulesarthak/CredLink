"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Users, Mail, Phone, Calendar, ExternalLink } from "lucide-react";
import { toast } from "react-hot-toast";
import styles from "./contacts.module.css";

// Types
interface ContactConnection {
  id: string;
  name: string;
  email: string;
  phone: string;
  sourceUrl?: string;
  createdAt: string;
  card: {
    id: string;
    fullName: string;
    cardName?: string;
  };
}

// Helper function to format relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/contacts", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await response.json();
        setContacts(data.contacts || []);
      } catch (error: any) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to load contacts");
        
        // Mock data for development/testing
        const mockContacts: ContactConnection[] = [
          {
            id: "1",
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+1 (555) 123-4567",
            sourceUrl: "https://credlink.com/cards/public/abc123",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            card: { id: "abc123", fullName: "Professional Card", cardName: "Business" }
          },
          {
            id: "2", 
            name: "Sarah Johnson",
            email: "sarah.j@company.com",
            phone: "+1 (555) 987-6543",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            card: { id: "def456", fullName: "Creative Portfolio", cardName: "Portfolio" }
          },
          {
            id: "3",
            name: "Mike Chen",
            email: "mike.chen@tech.io",
            phone: "+1 (555) 456-7890",
            sourceUrl: "https://credlink.com/cards/public/ghi789",
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            card: { id: "ghi789", fullName: "Tech Lead Card", cardName: "Professional" }
          }
        ];
        setContacts(mockContacts);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      contact.card.fullName.toLowerCase().includes(query) ||
      contact.card.cardName?.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleSourceClick = (sourceUrl: string) => {
    window.open(sourceUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <Users className={styles.titleIcon} />
              My Contacts
            </h1>
            <p className={styles.subtitle}>
              People who connected with your cards
            </p>
          </div>
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{contacts.length}</span>
              <span className={styles.statLabel}>Total Contacts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search contacts by name, email, phone, or card..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={styles.clearButton}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className={styles.resultsSection}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading contacts...</p>
          </div>
        ) : (
          <>
            {searchQuery && (
              <div className={styles.resultsHeader}>
                <p className={styles.resultsCount}>
                  Showing <span className={styles.countNumber}>{filteredContacts.length}</span> 
                  {filteredContacts.length === 1 ? ' contact' : ' contacts'}
                  {searchQuery && (
                    <span className={styles.searchTerm}> for "{searchQuery}"</span>
                  )}
                </p>
              </div>
            )}

            {filteredContacts.length === 0 ? (
              <div className={styles.emptyState}>
                <Users className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>
                  {searchQuery ? 'No contacts found' : 'No contacts yet'}
                </h3>
                <p className={styles.emptyMessage}>
                  {searchQuery 
                    ? 'Try adjusting your search terms or clear the search to see all contacts.'
                    : 'When people connect with your cards, they\'ll appear here.'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className={styles.clearSearchButton}
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.contactsList}>
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className={styles.contactCard}>
                    <div className={styles.contactHeader}>
                      <div className={styles.contactInfo}>
                        <div className={styles.avatar}>
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.contactDetails}>
                          <h3 className={styles.contactName}>{contact.name}</h3>
                          <p className={styles.contactCard}>
                            Connected via <span className={styles.cardName}>
                              {contact.card.cardName || contact.card.fullName}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className={styles.contactMeta}>
                        <span className={styles.timeStamp}>
                          <Calendar size={14} />
                          {formatRelativeTime(contact.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.contactActions}>
                      <button
                        onClick={() => handleEmailClick(contact.email)}
                        className={styles.actionButton}
                        title="Send email"
                      >
                        <Mail size={16} />
                        {contact.email}
                      </button>
                      
                      <button
                        onClick={() => handlePhoneClick(contact.phone)}
                        className={styles.actionButton}
                        title="Call phone"
                      >
                        <Phone size={16} />
                        {contact.phone}
                      </button>

                      {contact.sourceUrl && (
                        <button
                          onClick={() => handleSourceClick(contact.sourceUrl!)}
                          className={styles.actionButton}
                          title="View source page"
                        >
                          <ExternalLink size={16} />
                          Source
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
