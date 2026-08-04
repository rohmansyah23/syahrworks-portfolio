"use client";

import { useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionHeader from "@/components/home/SectionHeader";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nama wajib diisi.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      toast.error("Format email tidak valid.");
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      toast.error("Pesan minimal 10 karakter.");
      return;
    }

    if (!endpoint) {
      toast.error("Endpoint form belum dikonfigurasi.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Request gagal");
      setStatus("success");
      toast.success("Pesan terkirim! Terima kasih.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      toast.error("Gagal mengirim. Silakan coba lagi.");
    }
  }

  return (
    <section className="border-b border-border">
      <div className="container-editorial py-20 sm:py-28">
        <SectionHeader
          index="06"
          label="Contact"
          title="Have a project in mind?"
          description="Isi form di bawah — saya akan merespons secepatnya melalui email."
        />

        <form
          onSubmit={handleSubmit}
          className="grid max-w-3xl gap-5 border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="micro-label text-muted-foreground"
            >
              Name
            </label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="micro-label text-muted-foreground"
            >
              Email
            </label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label
              htmlFor="contact-message"
              className="micro-label text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full rounded-sm border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus-visible:border-foreground focus-visible:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={status === "loading"} size="lg">
              {status === "loading" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send />
              )}
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        closeButton={false}
        hideProgressBar
      />
    </section>
  );
}
