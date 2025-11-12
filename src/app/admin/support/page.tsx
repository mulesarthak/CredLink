"use client";

import "./support.css";
import { useEffect, useMemo, useState } from "react";
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

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "resolved">("all");
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const res = await fetch('/api/admin/messages/support');
        if (!res.ok) return;
        const data = await res.json();
        const sendersMap: Record<string, { id: string; fullName?: string; email?: string }> = {};
        (data.senders || []).forEach((s: any) => { sendersMap[s.id] = s; });
        const mapped: SupportTicket[] = (data.messages || []).map((m: any) => ({
          id: m.id,
          userName: sendersMap[m.senderId]?.fullName || 'Unknown',
          userEmail: sendersMap[m.senderId]?.email || '',
          subject: m.topic || 'Support',
          message: m.text || '',
          date: m.createdAt || new Date().toISOString(),
          status: String(m.status) === 'REPLIED' || String(m.status) === 'READ' ? 'Resolved' : 'Pending',
        }));
        setTickets(mapped);
      } catch (e) {
        console.error('Failed to load support messages', e);
      }
    };
    fetchSupport();
  }, []);

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

  const sendReply = async (id: string) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch('/api/admin/messages/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: id, replyText }),
      });
      if (!res.ok) throw new Error('Failed to send reply');
      // Mark ticket resolved locally
      updateTicketStatus(id, 'Resolved');
      setOpenReplyId(null);
      setReplyText('');
    } catch (e) {
      console.error('Reply failed', e);
      alert('Failed to send reply.');
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
