import { useState, useRef } from "react";
import {
  ArrowRight,
  Check,
  Mail,
  MessageCircle,
  Send,
  Upload,
  FileText,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { z } from "zod";

import DavidImage from "@/assets/David.webp";
import { Container } from "@/components/layout";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Display200,
  Body200,
  Body100,
  Body50,
  Caption,
  Header100,
} from "@/components/ui";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full Name is required")
    .max(100, "Full Name must be under 100 characters"),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(100, "Email must be under 100 characters"),
  source: z.string().min(1, "This field is required"),
  project: z
    .string()
    .min(30, "Project description must be at least 30 characters"),
  budget: z.string().min(1, "This field is required"),
  agreeProcessing: z.boolean().refine((val) => val === true, {
    message: "You must agree to the processing of your data",
  }),
  brief: z
    .custom<File>((val) => val instanceof File, "Brief must be a file")
    .optional()
    .refine((file) => !file || file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    source: "",
    project: "",
    budget: "",
    agreeProcessing: false,
    brief: undefined,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const email = import.meta.env.VITE_EMAIL;
  const telegram = import.meta.env.VITE_TELEGRAM;
  const whatsapp = import.meta.env.VITE_WHATSAPP;

  const validateField = (name: keyof ContactFormData, value: unknown) => {
    try {
      if (name === "brief" && value === undefined) return true; // Optional
      const schemaShape = contactSchema.shape as Record<string, z.ZodTypeAny>;
      schemaShape[name].parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const flatErrors = error.flatten();
        setErrors((prev) => ({
          ...prev,
          [name]: flatErrors.formErrors[0],
        }));
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (errors[name as keyof ContactFormData]) {
      validateField(name as keyof ContactFormData, val);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    validateField(name as keyof ContactFormData, val);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, brief: file }));
      validateField("brief", file);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, brief: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.brief;
      return newErrors;
    });
  };

  const isFormValid = contactSchema.safeParse(formData).success;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

      (Object.keys(fieldErrors) as Array<keyof ContactFormData>).forEach(
        (key) => {
          const messages = fieldErrors[key];
          if (messages && messages.length > 0) {
            newErrors[key] = messages[0];
          }
        },
      );

      setErrors(newErrors);
      return;
    }

    const lastSubmitted = localStorage.getItem("contactFormSubmitted");
    if (lastSubmitted) {
      const timeDiff = Date.now() - parseInt(lastSubmitted, 10);
      // 5 minutes in milliseconds
      if (timeDiff < 5 * 60 * 1000) {
        toast.warning(
          "You've already sent a message recently. Please wait a few minutes before trying again.",
        );
        return;
      }
    }

    // Submit form data
    const promise = async () => {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("source", formData.source);
      formDataToSend.append("project", formData.project);
      formDataToSend.append("budget", formData.budget);
      formDataToSend.append(
        "agreeProcessing",
        String(formData.agreeProcessing),
      );
      if (formData.brief) {
        formDataToSend.append("brief", formData.brief);
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit the form.");
      }

      return response.json();
    };

    toast.promise(promise, {
      loading: "Submitting the form...",
      success: () => {
        localStorage.setItem("contactFormSubmitted", Date.now().toString());
        setIsSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          source: "",
          project: "",
          budget: "",
          agreeProcessing: false,
          brief: undefined,
        });
        return "Form submitted successfully!";
      },
      error: (err) => {
        return err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      },
      duration: 5000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col"
          >
            <div>
              <motion.div
                variants={itemVariants}
                className="mb-8 flex cursor-default items-center gap-2"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <Caption className="font-medium">
                    Accepting new projects
                  </Caption>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Display200 className="mb-12 text-white">
                  Let's build your digital product.
                </Display200>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-12 space-y-4">
                <Body200 className="text-muted-foreground">
                  Fancy a simple message first? Contact by:
                </Body200>
                <div className="flex flex-wrap items-center gap-6">
                  <motion.a
                    href={`mailto:${email}`}
                    className="text-muted-foreground flex items-center gap-2 transition-colors hover:text-white"
                    whileHover="hover"
                    initial="initial"
                    data-umami-event="Contact - Email Link"
                  >
                    <motion.div
                      variants={{
                        hover: { rotate: [0, -10, 10, -5, 5, 0] },
                        initial: { rotate: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Mail className="h-4 w-4" />
                    </motion.div>
                    <Body50 as="span">Email</Body50>
                  </motion.a>
                  <motion.a
                    href={telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground flex items-center gap-2 transition-colors hover:text-white"
                    whileHover="hover"
                    initial="initial"
                    data-umami-event="Contact - Telegram Link"
                  >
                    <motion.div
                      variants={{
                        hover: { rotate: [0, -10, 10, -5, 5, 0] },
                        initial: { rotate: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Send className="h-4 w-4" />
                    </motion.div>
                    <Body50 as="span">Telegram</Body50>
                  </motion.a>
                  <motion.a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground flex items-center gap-2 transition-colors hover:text-white"
                    whileHover="hover"
                    initial="initial"
                    data-umami-event="Contact - WhatsApp Link"
                  >
                    <motion.div
                      variants={{
                        hover: { rotate: [0, -10, 10, -5, 5, 0] },
                        initial: { rotate: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </motion.div>
                    <Body50 as="span">WhatsApp</Body50>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 sm:mt-4"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10">
                <img
                  src={DavidImage}
                  alt="David - Founder & Lead Developer"
                  width={56}
                  height={56}
                  className="pointer-events-none h-full w-full object-cover"
                />
              </div>
              <div>
                <Body200 className="font-medium text-white">
                  David Bazashvili
                </Body200>
                <Body100 className="text-muted-foreground">
                  Founder & Lead Developer
                </Body100>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, x: 20 }}
                viewport={{ once: true }}
                variants={containerVariants}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    placeholder="John Doe"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(
                      "h-12 border-white/10 bg-white/5 transition-colors focus-visible:bg-white/10",
                      errors.fullName &&
                        "border-red-500 focus-visible:ring-red-500",
                    )}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500">{errors.fullName}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    placeholder="email@example.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(
                      "h-12 border-white/10 bg-white/5 transition-colors focus-visible:bg-white/10",
                      errors.email &&
                        "border-red-500 focus-visible:ring-red-500",
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label>Where did you hear about us?</Label>
                  <Select
                    value={formData.source || undefined}
                    onValueChange={(val) => handleSelectChange("source", val)}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-12! w-full border-white/10 bg-white/5 text-base transition-colors focus:bg-white/10 md:text-sm",
                        errors.source &&
                          "border-red-500 focus-visible:ring-red-500",
                      )}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="h-12 text-base md:text-sm"
                        value="google"
                      >
                        Google
                      </SelectItem>
                      <SelectItem
                        className="h-12 text-base md:text-sm"
                        value="AI tool (ChatGPT, Claude, Gemini, etc.)"
                      >
                        AI tool (ChatGPT, Claude, Gemini, etc.)
                      </SelectItem>
                      <SelectItem
                        className="h-12 text-base md:text-sm"
                        value="referral"
                      >
                        Referral
                      </SelectItem>
                      <SelectItem
                        className="h-12 text-base md:text-sm"
                        value="other"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.source && (
                    <p className="text-xs text-red-500">{errors.source}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="project">Describe your project</Label>
                  <Textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    placeholder="Provide a much detail as you'd like to"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(
                      "min-h-[120px] border-white/10 bg-white/5 transition-colors focus-visible:bg-white/10",
                      errors.project &&
                        "border-red-500 focus-visible:ring-red-500",
                    )}
                  />
                  {errors.project && (
                    <p className="text-xs text-red-500">{errors.project}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label>Budget</Label>
                  <Select
                    value={formData.budget || undefined}
                    onValueChange={(val) => handleSelectChange("budget", val)}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-12! w-full border-white/10 bg-white/5 text-base transition-colors focus:bg-white/10 md:text-sm",
                        errors.budget &&
                          "border-red-500 focus-visible:ring-red-500",
                      )}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="h-12 text-base md:text-sm"
                        value="10-20k"
                      >
                        £1k - £5k
                      </SelectItem>
                      <SelectItem
                        className="h-12 text-base md:text-sm"
                        value="20-50k"
                      >
                        £5k - £10k
                      </SelectItem>
                      <SelectItem
                        className="h-12 text-base md:text-sm"
                        value="50k+"
                      >
                        £15k+
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="text-xs text-red-500">{errors.budget}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <Label>Have a brief?</Label>
                    <Caption className="text-muted-foreground">
                      (Max 20MB)
                    </Caption>
                  </div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10",
                      errors.brief &&
                        "border-red-500 bg-red-500/5 hover:bg-red-500/10",
                    )}
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    {formData.brief ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-white" />
                        <Body50 className="text-white">
                          {formData.brief.name}
                        </Body50>
                        <div
                          onClick={removeFile}
                          className="z-10 cursor-pointer rounded-full p-1 hover:bg-white/10"
                        >
                          <X className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <Body50
                        className={cn(
                          "flex items-center gap-2 font-medium tracking-wider uppercase transition-colors group-hover:text-white",
                          errors.brief &&
                            "text-red-400 group-hover:text-red-300",
                        )}
                      >
                        <Upload className="h-4 w-4" />
                        Select or drop a file (PDF)
                      </Body50>
                    )}
                  </div>
                  {errors.brief && (
                    <p className="text-xs text-red-500">{errors.brief}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4 pt-4">
                  <label className="group flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5 flex items-center">
                      <input
                        type="checkbox"
                        name="agreeProcessing"
                        checked={formData.agreeProcessing}
                        onChange={handleChange}
                        className={cn(
                          "peer h-5 w-5 appearance-none rounded border border-white/20 bg-transparent transition-all checked:border-white checked:bg-white",
                          errors.agreeProcessing && "border-red-500",
                        )}
                      />
                      <Check className="pointer-events-none absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100" />
                    </div>
                    <Body50 className="text-muted-foreground leading-tight transition-colors select-none group-hover:text-white">
                      I agree to bzvstudio processing the information submitted
                      in order to respond to my request.
                    </Body50>
                  </label>
                  {errors.agreeProcessing && (
                    <p className="text-xs text-red-500">
                      {errors.agreeProcessing}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    whileHover={isFormValid ? "hover" : undefined}
                    type="submit"
                    disabled={!isFormValid}
                    data-umami-event="Contact Form Submit"
                    className={cn(
                      "flex h-14 w-full items-center justify-center rounded-full bg-white text-base font-bold tracking-wide text-black uppercase transition-colors",
                      isFormValid
                        ? "hover:bg-white/90"
                        : "cursor-not-allowed opacity-50",
                    )}
                  >
                    Start Project
                    <motion.span
                      variants={{
                        visible: {
                          x: 0,
                          transition: { duration: 0.5, ease: "easeOut" },
                        },
                        hover: {
                          x: 4,
                          transition: { duration: 0.2, ease: "easeOut" },
                        },
                      }}
                      className="ml-2 flex items-center"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center backdrop-blur-sm md:p-12"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Check className="h-8 w-8" />
                </div>
                <Header100 className="mb-4 text-white">
                  Thank you for contacting us.
                </Header100>
                <Body200 className="text-muted-foreground max-w-md">
                  We aim to respond to all emails within 1 business day. We look
                  forward to reading your project proposal and exploring how we
                  can help bring your vision to life.
                </Body200>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
