import { useState } from "react";
import { format, differenceInMonths, differenceInDays, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
    Calendar as CalendarIcon,
    Star,
    Check,
    Users,
    MessageSquare,
    Shield,
    CreditCard,
    User,
    Mail,
    Phone,
    FileText,
    CheckCircle2,
} from "lucide-react";

const BookingForm = ({ propertyId, price, rating, reviewCount }) => {
    const { toast } = useToast();
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [guests, setGuests] = useState("1");
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Guest info form
    const [guestInfo, setGuestInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        agreeTerms: false,
    });

    const serviceFeeRate = 0.10; // 10% service fee
    const securityDeposit = 500;

    const calculateDuration = () => {
        if (!checkIn || !checkOut) return { months: 0, days: 0 };
        const months = differenceInMonths(checkOut, checkIn);
        const remainingDays = differenceInDays(checkOut, addMonths(checkIn, months));
        return { months, days: remainingDays };
    };

    const calculateTotal = () => {
        const { months, days } = calculateDuration();
        const dailyRate = price / 30;
        const subtotal = (months * price) + (days * dailyRate);
        const serviceFee = subtotal * serviceFeeRate;
        return {
            subtotal: Math.round(subtotal),
            serviceFee: Math.round(serviceFee),
            securityDeposit,
            total: Math.round(subtotal + serviceFee + securityDeposit),
        };
    };

    const { months, days } = calculateDuration();
    const { subtotal, serviceFee, total } = calculateTotal();
    const hasValidDates = checkIn && checkOut && checkOut > checkIn;

    const handleBookNow = () => {
        if (!hasValidDates) {
            toast({
                title: "Select dates",
                description: "Please select check-in and check-out dates.",
                variant: "destructive",
            });
            return;
        }
        setShowBookingModal(true);
    };

    const handleSubmitBooking = async () => {
        if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone) {
            toast({
                title: "Missing information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        if (!guestInfo.agreeTerms) {
            toast({
                title: "Terms required",
                description: "Please agree to the terms and conditions.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setShowBookingModal(false);
        setShowSuccessModal(true);
    };

    return (
        <>
            <Card className="sticky top-24 p-6">
                {/* Price Header */}
                <div className="flex items-baseline justify-between mb-6">
                    <div>
                        <span className="text-3xl font-bold text-foreground">${price.toLocaleString()}</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-medium">{rating}</span>
                        <span className="text-muted-foreground">({reviewCount})</span>
                    </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label className="text-sm font-medium mb-2 block">Check In</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !checkIn && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="w-4 h-4 mr-2" />
                                        {checkIn ? format(checkIn, "MMM d, yyyy") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkIn}
                                        onSelect={setCheckIn}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                        className="pointer-events-auto"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label className="text-sm font-medium mb-2 block">Check Out</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !checkOut && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="w-4 h-4 mr-2" />
                                        {checkOut ? format(checkOut, "MMM d, yyyy") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkOut}
                                        onSelect={setCheckOut}
                                        disabled={(date) => date <= (checkIn || new Date())}
                                        initialFocus
                                        className="pointer-events-auto"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Guests */}
                    <div>
                        <Label className="text-sm font-medium mb-2 block">Guests</Label>
                        <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger className="w-full">
                                <Users className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 Guest</SelectItem>
                                <SelectItem value="2">2 Guests</SelectItem>
                                <SelectItem value="3">3 Guests</SelectItem>
                                <SelectItem value="4">4 Guests</SelectItem>
                                <SelectItem value="5">5+ Guests</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Price Breakdown */}
                {hasValidDates && (
                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                ${price.toLocaleString()} × {months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}
                                {days > 0 ? ` ${months > 0 ? '+ ' : ''}${days} day${days > 1 ? 's' : ''}` : ''}
                            </span>
                            <span className="text-foreground">${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Service fee (10%)</span>
                            <span className="text-foreground">${serviceFee.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Security deposit (refundable)</span>
                            <span className="text-foreground">${securityDeposit.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between font-semibold pt-3 border-t border-border">
                            <span>Total</span>
                            <span className="text-xl">${total.toLocaleString()}</span>
                        </div>
                    </div>
                )}

                {!hasValidDates && (
                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Monthly rent</span>
                            <span className="text-foreground">${price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Service fee (10%)</span>
                            <span className="text-foreground">${Math.round(price * serviceFeeRate).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">
                            Select dates to see final price breakdown
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <Button
                    variant="hero"
                    size="lg"
                    className="w-full mb-3"
                    onClick={handleBookNow}
                >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Book Now
                </Button>

                <Button variant="outline" size="lg" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Owner
                </Button>

                {/* Trust Badges */}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success" />
                        <span>Free cancellation within 48 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4 text-success" />
                        <span>Secure payment processing</span>
                    </div>
                </div>
            </Card>

            {/* Booking Modal */}
            <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Complete Your Booking</DialogTitle>
                        <DialogDescription>
                            Fill in your details to confirm your reservation
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Booking Summary */}
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <h4 className="font-medium text-foreground">Booking Summary</h4>
                            <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Check-in</span>
                                    <span>{checkIn ? format(checkIn, "MMM d, yyyy") : "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Check-out</span>
                                    <span>{checkOut ? format(checkOut, "MMM d, yyyy") : "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Guests</span>
                                    <span>{guests} guest{parseInt(guests) > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex justify-between font-semibold pt-2 border-t border-border mt-2">
                                    <span>Total</span>
                                    <span>${total ? total.toLocaleString() : 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Guest Information */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-foreground flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Guest Information
                            </h4>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        value={guestInfo.firstName}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name *</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        value={guestInfo.lastName}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="w-3 h-3" />
                                    Email Address *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={guestInfo.email}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="w-3 h-3" />
                                    Phone Number *
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={guestInfo.phone}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    Message to Owner (Optional)
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Introduce yourself and share your rental purpose..."
                                    rows={3}
                                    value={guestInfo.message}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, message: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="terms"
                                checked={guestInfo.agreeTerms}
                                onCheckedChange={(checked) =>
                                    setGuestInfo({ ...guestInfo, agreeTerms: checked })
                                }
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                            >
                                I agree to the <span className="text-accent underline">Terms of Service</span> and{" "}
                                <span className="text-accent underline">Cancellation Policy</span>. I understand that
                                the security deposit is refundable after checkout inspection.
                            </label>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowBookingModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="hero"
                            onClick={handleSubmitBooking}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin mr-2">⏳</span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Confirm Booking
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none bg-transparent shadow-none">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                        {/* Header Decoration */}
                        <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-600 relative flex items-center justify-center">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                Your reservation has been sent to the owner. We've sent a confirmation summary to your email address.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200/50">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booking Reference</span>
                                        <span className="font-mono text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                            BK-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-slate-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Sent to</p>
                                                <p className="text-slate-700 font-medium truncate max-w-[200px]">{guestInfo.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="hero"
                                className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-emerald-200"
                                onClick={() => setShowSuccessModal(false)}
                            >
                                Track in Dashboard
                            </Button>

                            <p className="mt-4 text-xs text-slate-400 font-medium cursor-pointer hover:text-slate-600 transition-colors" onClick={() => setShowSuccessModal(false)}>
                                Back to property
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    );
};

export default BookingForm;