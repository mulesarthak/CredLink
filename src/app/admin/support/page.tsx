"use client";

import "./support.css";
import { useState } from "react";
import {
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  Reply,
  Send,
  Mail,
  Calendar,
} from "lucide-react";

interface SupportTicket {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  date: string;
  status: "Pending" | "Resolved";
}

const dummyTickets: SupportTicket[] = [
  {
    id: "1",
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    subject: "Unable to update profile information",
    message:
      "I'm having trouble updating my profile details. Every time I try to save changes, I get an error message saying 'Failed to update profile'. Could you please help me resolve this issue?",
    date: "2024-11-02",
    status: "Pending",
  },
  {
    id: "2",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@email.com",
    subject: "Payment processing issue",
    message:
      "My payment was charged but the transaction shows as failed in my account. The amount was deducted from my bank account but I don't see the credit in my balance.",
    date: "2024-11-01",
    status: "Resolved",
  },
  {
    id: "3",
    userName: "Mike Chen",
    userEmail: "mike.chen@email.com",
    subject: "Account verification problems",
    message:
      "I've uploaded my documents for verification multiple times but my account status still shows as unverified.",
    date: "2024-10-31",
    status: "Pending",
  },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(dummyTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "resolved">("all");
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchSearch =
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === "all" ||
      ticket.status.toLowerCase() === filterStatus.toLowerCase();

    return matchSearch && matchStatus;
  });

  const updateTicketStatus = (id: string, newStatus: "Pending" | "Resolved") => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleReplyToggle = (id: string) => {
    setOpenReplyId(openReplyId === id ? null : id);
    setReplyText("");
  };

  const sendReply = (id: string) => {
    if (replyText.trim()) {
      alert(`Reply sent to ${id}: ${replyText}`);
      setOpenReplyId(null);
      setReplyText("");
    }
  };

  const getStatusBadge = (status: string) =>
    status === "Pending" ? (
      <span className="status-badge pending">
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </span>
    ) : (
      <span className="status-badge resolved">
        <CheckCircle className="w-3 h-3 mr-1" />
        Resolved
      </span>
    );

  return (
    <div className="support-page min-h-screen">
      <div className="support-container">
        {/* Header */}
        <header className="support-header">
          <div>
            <h1 className="support-title">Support & Feedback</h1>
            <p className="support-subtitle">
              Manage customer support tickets and feedback efficiently
            </p>
          </div>
          <button className="export-btn">
            <MessageSquare className="w-4 h-4" />
            Export Tickets
          </button>
        </header>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-box relative">
            <Search className="search-icon" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by user, email, or subject..."
              className="search-input"
            />
          </div>
          <div className="filter-tabs">
            {["all", "pending", "resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab as any)}
                className={`tab-btn ${filterStatus === tab ? "active" : ""}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets */}
        <section className="ticket-section">
          {filteredTickets.map((t) => (
            <div key={t.id} className="ticket-card hover:shadow-2xl">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="avatar">
                      {t.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="ticket-user">{t.userName}</h3>
                      <div className="ticket-meta">
                        <span>
                          <Mail className="w-4 h-4" />
                          {t.userEmail}
                        </span>
                        <span>
                          <Calendar className="w-4 h-4" />
                          {new Date(t.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>{getStatusBadge(t.status)}</div>
                </div>

                {/* Body */}
                <div className="ticket-body">
                  <h4 className="ticket-subject">{t.subject}</h4>
                  <p className="ticket-message">{t.message}</p>
                </div>

                {/* Actions */}
                <div className="ticket-actions">
                  <button
                    onClick={() => handleReplyToggle(t.id)}
                    className={`action-btn ${openReplyId === t.id ? "active" : ""}`}
                  >
                    <Reply className="w-4 h-4" />
                    {openReplyId === t.id ? "Cancel" : "Reply"}
                  </button>

                  <button
                    onClick={() => updateTicketStatus(t.id, "Resolved")}
                    className="status-btn resolved"
                    disabled={t.status === "Resolved"}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Resolved
                  </button>

                  <button
                    onClick={() => updateTicketStatus(t.id, "Pending")}
                    className="status-btn pending"
                    disabled={t.status === "Pending"}
                  >
                    <Clock className="w-4 h-4" />
                    Mark Pending
                  </button>
                </div>

                {/* Reply Box */}
                {openReplyId === t.id && (
                  <div className="reply-box">
                    <h5 className="reply-title">
                      <Reply className="w-4 h-4 text-[#0066FF]" />
                      Reply to {t.userName}
                    </h5>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="reply-input"
                    />
                    <div className="reply-actions">
                      <button
                        onClick={() => setOpenReplyId(null)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => sendReply(t.id)}
                        disabled={!replyText.trim()}
                        className="send-btn"
                      >
                        <Send className="w-4 h-4" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
