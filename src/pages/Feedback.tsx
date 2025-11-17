import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail, User, CheckCircle, X } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Feedback = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Feedback & Citizen Connect
          </h1>
          <p className="text-lg text-muted-foreground">
            Share your thoughts and help us improve our city services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-8 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your feedback, suggestions, or report issues..."
                  rows={6}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                size="lg"
              >
                Submit Feedback
              </Button>
            </form>
          </Card>

          {/* Info Cards */}
          <div className="space-y-6">
            <Card className="p-8 shadow-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Connect With Us
              </h3>
              <p className="text-muted-foreground mb-6">
                Your feedback helps us build a better city. We're committed to
                listening to our citizens and continuously improving our services.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Quick Response
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      We review all feedback within 24-48 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Action-Oriented
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Your suggestions directly influence city improvements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-info/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Community Focus
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Building better services together with citizens
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Follow Us
              </h3>
              <p className="text-muted-foreground mb-6">
                Stay updated with the latest city news and announcements on social
                media.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="hover:scale-105 transition-all">
                  Twitter
                </Button>
                <Button variant="outline" className="hover:scale-105 transition-all">
                  Facebook
                </Button>
                <Button variant="outline" className="hover:scale-105 transition-all">
                  Instagram
                </Button>
                <Button variant="outline" className="hover:scale-105 transition-all">
                  LinkedIn
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <Card className="max-w-md w-full p-8 shadow-hover animate-scale-in">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Thank You!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your feedback has been successfully submitted. We appreciate your
                input and will review it shortly.
              </p>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  Connect with us on social media:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-all"
                  >
                    @CityPulse
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-all"
                  >
                    fb.com/citypulse
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => setShowModal(false)}
                className="w-full mt-6 bg-primary hover:bg-primary/90 transition-all"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Feedback;
