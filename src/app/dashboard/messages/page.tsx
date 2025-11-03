"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import { Search, Trash2, X, MoreVertical } from "lucide-react";
import { ca } from "zod/v4/locales";
import { send } from "process";

type MessageStatus = "New" | "Read" | "Replied" | "Pending" | "Archived" | "Deleted";
type MessageTag = "Lead" | "Support" | "Pricing" | "Feedback" | null;

interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: MessageStatus;
  read: boolean;
  starred: boolean;
  tag: MessageTag;
  senderId: string; // Store the original sender's ID for replies
  replies?: {
    text: string;
    date: string;
  }[];
}

export default function MessagesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    // @ts-ignore
    (mql.addEventListener ? mql.addEventListener("change", onChange) : mql.addListener(onChange));
    return () => {
      // @ts-ignore
      (mql.removeEventListener ? mql.removeEventListener("change", onChange) : mql.removeListener(onChange));
    };
  }, []);
  useEffect(() => {
    fetchMessages();

  }, []);
  const fetchMessages = async () => {
    try{
      const token = localStorage.getItem('token');
      console.log('token', token);
      const response = await fetch('/api/message/receive', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        
      });
      if (response.ok) {
        const data = await response.json();

        // Map API response (messages + senders) into the UI MessageItem shape
        // API: { messages: [{ id, text, senderId, receiverId, createdAt }], senders: [{ id, fullName, email }] }
        const sendersMap: Record<string, { id: string; fullName?: string; email?: string }> = {};
        (data.senders || []).forEach((s: any) => {
          sendersMap[s.id] = s;
        });

        const statusMap: Record<string, MessageStatus> = {
          NEW: 'New',
          READ: 'Read',
          REPLIED: 'Replied',
          PENDING: 'Pending',
          ARCHIVED: 'Archived',
          DELETED: 'Deleted',
        };
        const tagMap: Record<string, Exclude<MessageTag, null>> = {
          LEAD: 'Lead',
          SUPPORT: 'Support',
          PRICING: 'Pricing',
          FEEDBACK: 'Feedback',
        };

        const mapped: MessageItem[] = (data.messages || []).map((msg: any) => {
          const sender = sendersMap[msg.senderId] || {};
          return {
            id: msg.id,
            name: sender.fullName || "Unknown",
            email: sender.email || "",
            message: msg.text || msg.message || "",
            date: msg.createdAt || msg.date || new Date().toISOString(),
            status: statusMap[String(msg.status)] || "New",
            read: typeof msg.read === 'boolean' ? msg.read : false,
            starred: false,
            tag: tagMap[String(msg.tag)] || null,
            senderId: msg.senderId, // Store senderId for replies
            replies: [],
          } as MessageItem;
        });

        setMessages(mapped);
      }
      console.log(response);
    }catch(err){
      console.error('Error fetching messages:', err);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  };

  // const [messages, setMessages] = useState<MessageItem[]>([
  //   {
  //     id: "msg_001",
  //     name: "Aarav Patel",
  //     email: "aarav@example.com",
  //     message: "Interested in your premium plan. Can we schedule a call?",
  //     date: "2025-10-30T10:12:00",
  //     status: "New",
  //     read: false,
  //     starred: true,
  //     tag: "Lead",
  //   },
  //   {
  //     id: "msg_002",
  //     name: "Isha Gupta",
  //     email: "isha.g@example.com",
  //     message: "Loved the demo card. How do I embed it on my website?",
  //     date: "2025-10-30T09:02:00",
  //     status: "Replied",
  //     read: true,
  //     starred: false,
  //     tag: "Support",
  //   },
  //   {
  //     id: "msg_003",
  //     name: "Rahul Verma",
  //     email: "rahul.v@example.com",
  //     message: "Can you share pricing for teams of 10?",
  //     date: "2025-10-29T18:44:00",
  //     status: "Pending",
  //     read: false,
  //     starred: false,
  //     tag: "Pricing",
  //   },
  // ]);

  const [activeFilter, setActiveFilter] = useState<"All" | "Unread" | "Replied" | "Pending" | "Archived" | "Deleted">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredMessages = useMemo(() => {
    let filtered = messages;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }

    switch (activeFilter) {
      case "Unread": filtered = filtered.filter(m => !m.read && m.status !== "Archived" && m.status !== "Deleted"); break;
      case "Replied": filtered = filtered.filter(m => m.status === "Replied"); break;
      case "Pending": filtered = filtered.filter(m => m.status === "Pending"); break;
      case "Archived": filtered = filtered.filter(m => m.status === "Archived"); break;
      case "Deleted": filtered = filtered.filter(m => m.status === "Deleted"); break;
      default: filtered = filtered.filter(m => m.status !== "Archived" && m.status !== "Deleted");
    }

    return filtered.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });
  }, [messages, activeFilter, searchQuery, sortOrder]);

  const openDetail = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true, status: m.status === "New" ? "Read" : m.status } : m));
    setDetailId(id);
  };

  
  

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: "Deleted" } : m));

    const sendDeleteRequest = async () => {
      try {
        const response = await fetch(`/api/message/delete?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        if (!response.ok && response.status !== 404) {
          throw new Error("Failed to delete message");
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    };
    sendDeleteRequest();
    if (detailId === id) setDetailId(null);
    if (replyId === id) setReplyId(null);
  };

  const sendReply = async () => {
    if (!replyId || !replyText.trim()) return;
    
    const originalMessage = messages.find(m => m.id === replyId);
    if (!originalMessage) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/message/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: replyText.trim(),
          receiverId: originalMessage.senderId, // Send reply back to original sender
          status: 'REPLIED',
          tag: originalMessage.tag?.toUpperCase() || 'SUPPORT',
          read: false,
        }),
      });

      if (response.ok) {
        // Update local state to reflect the reply
        setMessages(prev => prev.map(m => m.id === replyId ? { 
          ...m, 
          status: "Replied", 
          read: true,
          replies: [
            ...(m.replies || []),
            {
              text: replyText,
              date: new Date().toISOString()
            }
          ]
        } : m));
        setReplyId(null);
        setReplyText("");
        // Optionally refetch messages to sync with backend
        // fetchMessages();
      } else {
        const errorData = await response.json();
        console.error('Failed to send reply:', errorData);
        alert('Failed to send reply. Please try again.');
      }
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Error sending reply. Please check your connection.');
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    const styles: Record<MessageStatus, string> = {
      New: "bg-blue-100 text-blue-700",
      Read: "bg-gray-100 text-gray-600",
      Replied: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Archived: "bg-gray-50 text-gray-500",
      Deleted: "bg-red-50 text-red-600",
    };
    return `px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`;
  };

  const getTagBadge = (tag: MessageTag) => {
    const styles: Record<NonNullable<MessageTag>, string> = {
      Lead: "bg-purple-100 text-purple-700",
      Support: "bg-blue-100 text-blue-700",
      Pricing: "bg-green-100 text-green-700",
      Feedback: "bg-orange-100 text-orange-700",
    };
    return tag ? `px-2 py-0.5 text-xs font-medium rounded-full ${styles[tag]}` : "";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F7FB",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: 0,
          boxSizing: "border-box",
          padding: isMobile ? "8px 10px" : "20px 24px",
        }}
      >
        {/* Header */}
        {isMobile ? (
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Messages</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
              <button
                aria-label="Filters"
                onClick={() => setMobileFilterOpen(v => !v)}
                style={{ padding: 6, color: "#475569" }}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {mobileFilterOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 34,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: 8,
                    boxShadow: "0 8px 24px rgba(16,24,40,0.12)",
                    zIndex: 30,
                    width: 180,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => { setSortOrder("newest"); setMobileFilterOpen(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 12px",
                      background: sortOrder === "newest" ? "#EFF6FF" : "transparent",
                      color: "#0F172A",
                    }}
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => { setSortOrder("oldest"); setMobileFilterOpen(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 12px",
                      background: sortOrder === "oldest" ? "#EFF6FF" : "transparent",
                      color: "#0F172A",
                    }}
                  >
                    Oldest First
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, color: "#0F172A" }}>Messages</h1>
            <p style={{ fontSize: "var(--text-sm)", color: "#475569", marginTop: 4 }}>Manage incoming messages, leads, and conversations.</p>
          </div>
        )}

        {/* Search & Actions */}
        {!isMobile && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06)",
            padding: 16,
            marginBottom: 16,
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full"
                style={{
                  padding: "10px 14px 10px 40px",
                  fontSize: 14,
                  border: "1px solid #CBD5E1",
                  borderRadius: 8,
                  outline: "none",
                }}
              />
            </div>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as any)}
              style={{
                padding: "10px 16px",
                fontSize: 14,
                border: "1px solid #CBD5E1",
                borderRadius: 8,
                outline: "none",
                backgroundColor: "#FFFFFF",
                color: "#0F172A",
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            
          </div>
        </div>
        )}

        {/* Filters & List */}
        <div
          style={{
            backgroundColor: "transparent",
            borderRadius: 12,
            boxShadow: "none",
            border: "none",
          }}
        >
          {/* Filter Tabs */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{ padding: 16, borderBottom: "1px solid #E5E7EB" }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {(["All", "Unread", "Replied", "Pending", "Archived", "Deleted"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: "8px 12px",
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 9999,
                    transition: "background-color .2s ease",
                    backgroundColor: activeFilter === f ? "#2563EB" : "#F1F5F9",
                    color: activeFilter === f ? "#FFFFFF" : "#334155",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 13, color: "#475569" }}>Showing {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Message List */}
          <ul>
            {filteredMessages.length === 0 ? (
              <li style={{ padding: 48, textAlign: "center", color: "#6B7280" }}>
                <p style={{ fontSize: 18 }}>No messages found.</p>
              </li>
            ) : (
              filteredMessages.map(m => (
                <li
                  key={m.id}
                  className="last:border-b-0"
                  onMouseEnter={() => !isMobile && setHoveredId(m.id)}
                  onMouseLeave={() => !isMobile && setHoveredId(null)}
                  style={{
                    padding: 16,
                    margin: "8px 8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: 12,
                    boxShadow: hoveredId === m.id && !isMobile ? "0 8px 16px rgba(16,24,40,0.12)" : "0 1px 2px rgba(16,24,40,0.06)",
                    transform: hoveredId === m.id && !isMobile ? "translateY(-2px)" : "translateY(0)",
                    transition: "transform .15s ease, box-shadow .15s ease",
                  }}
                >
                  <div className="flex items-start gap-3">
                    

                    {/* Content */}
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => openDetail(m.id)}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <p
                          className="font-semibold truncate"
                          style={{ color: !m.read ? "#0F172A" : "#374151", fontWeight: !m.read ? 700 : 600 }}
                        >
                          {m.name}
                        </p>
                        <span style={{ fontSize: "var(--text-xs)", color: "#6B7280" }} className="truncate">{m.email}</span>
                        {m.tag && <span className={getTagBadge(m.tag)}>{m.tag}</span>}
                        <span className={getStatusBadge(m.status)}>{m.status}</span>
                      </div>
                      <p style={{ marginTop: 4, fontSize: "var(--text-sm)", color: "#475569" }} className="line-clamp-2">{m.message}</p>
                      {m.replies && m.replies.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          <p style={{ fontSize: "var(--text-xs)", color: "#6B7280" }}>Replies:</p>
                          {m.replies.map(reply => (
                            <p key={reply.date} style={{ fontSize: "var(--text-sm)", color: "#1F2937" }}>{reply.text}</p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="whitespace-nowrap self-center" style={{ minWidth: "90px", textAlign: "right", fontSize: 12, color: "#6B7280" }}>
                      {formatDate(m.date)}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-center">
                      <button
                        onClick={e => { e.stopPropagation(); setReplyId(m.id); }}
                        style={{
                          padding: "6px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#166534",
                          backgroundColor: "#ECFDF5",
                          borderRadius: 9999,
                        }}
                      >
                        Reply
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); deleteMessage(m.id); }}
                        style={{ padding: 6, color: "#DC2626", borderRadius: 9999, background: "transparent" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Detail Modal */}
      {detailId && messages.find(m => m.id === detailId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setDetailId(null)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(16,24,40,0.18)",
              width: "100%",
              maxWidth: 896,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {(() => {
              const msg = messages.find(m => m.id === detailId)!;
              return (
                <div style={{ padding: 24 }}>
                  <div className="flex justify-between items-start" style={{ marginBottom: 16 }}>
                    <div className="flex items-center gap-3">
                      <div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>{msg.name}</h2>
                        <p style={{ fontSize: 13, color: "#475569" }}>{msg.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setDetailId(null)} style={{ color: "#94A3B8" }}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-2" style={{ marginBottom: 16 }}>
                    {msg.tag && <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTagBadge(msg.tag)}`}>{msg.tag}</span>}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(msg.status)}`}>{msg.status}</span>
                  </div>

                  <p style={{ fontSize: 14, color: "#475569", marginBottom: 8 }}>
                    Received: {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(msg.date))}
                  </p>

                  <div
                    className="whitespace-pre-line"
                    style={{
                      marginTop: 16,
                      padding: 16,
                      backgroundColor: "#F8FAFC",
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      color: "#1F2937",
                    }}
                  >
                    {msg.message}
                  </div>

                  {msg.replies && msg.replies.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <p style={{ fontSize: "var(--text-xs)", color: "#6B7280" }}>Replies:</p>
                      {msg.replies.map(reply => (
                        <p key={reply.date} style={{ fontSize: "var(--text-sm)", color: "#1F2937" }}>{reply.text}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3" style={{ marginTop: 24 }}>
                    <button
                      onClick={() => { setDetailId(null); setReplyId(msg.id); }}
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#2563EB",
                        color: "#FFFFFF",
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => { setDetailId(null); deleteMessage(msg.id); }}
                      className="flex items-center gap-2"
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#FEF2F2",
                        color: "#DC2626",
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyId && messages.find(m => m.id === replyId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setReplyId(null)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(16,24,40,0.18)",
              width: "100%",
              maxWidth: 640,
            }}
          >
            {(() => {
              const msg = messages.find(m => m.id === replyId)!;
              return (
                <div style={{ padding: 24 }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600 }}>Reply to {msg.name}</h3>
                    <button onClick={() => setReplyId(null)} style={{ color: "#94A3B8" }}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p style={{ fontSize: 14, color: "#475569", marginBottom: 16 }}>{msg.email}</p>
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full resize-none"
                    style={{
                      height: 128,
                      padding: 12,
                      border: "1px solid #CBD5E1",
                      borderRadius: 8,
                      outline: "none",
                    }}
                  />
                  <div className="flex justify-end gap-2" style={{ marginTop: 16 }}>
                    <button onClick={() => setReplyId(null)} style={{ padding: "10px 16px", color: "#334155", backgroundColor: "#F1F5F9", borderRadius: 8 }}>
                      Cancel
                    </button>
                    <button
                      onClick={sendReply}
                      disabled={!replyText.trim()}
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#2563EB",
                        color: "#FFFFFF",
                        borderRadius: 8,
                        opacity: !replyText.trim() ? 0.5 : 1,
                        cursor: !replyText.trim() ? "not-allowed" : "pointer",
                      }}
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}