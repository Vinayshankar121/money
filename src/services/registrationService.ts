/**
 * Registration Management Service
 * Handles user registrations for events
 */

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  registrationDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlist';
  paymentStatus?: 'pending' | 'completed' | 'failed';
  teamMembers?: string[];
}

export interface RegistrationData {
  eventId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  teamMembers?: string[];
}

export class RegistrationService {
  private registrations: Map<string, Registration> = new Map();
  private eventCapacity: Map<string, number> = new Map();
  private eventRegistrations: Map<string, Set<string>> = new Map();

  /**
   * Register user for an event
   */
  register(data: RegistrationData): { success: boolean; registration?: Registration; error?: string } {
    // Validate email
    if (!this.isValidEmail(data.userEmail)) {
      return { success: false, error: 'Invalid email address' };
    }

    // Validate phone
    if (!this.isValidPhone(data.userPhone)) {
      return { success: false, error: 'Invalid phone number' };
    }

    // Check if already registered
    if (this.isUserRegistered(data.eventId, data.userEmail)) {
      return { success: false, error: 'Already registered for this event' };
    }

    // Check capacity
    const capacity = this.eventCapacity.get(data.eventId);
    const currentCount = this.getEventRegistrationCount(data.eventId);
    
    let status: Registration['status'] = 'confirmed';
    if (capacity !== undefined && currentCount >= capacity) {
      status = 'waitlist';
    }

    const registration: Registration = {
      id: this.generateId(),
      eventId: data.eventId,
      userId: data.userEmail,
      userName: data.userName,
      userEmail: data.userEmail,
      userPhone: data.userPhone,
      registrationDate: new Date(),
      status,
      paymentStatus: 'pending',
      teamMembers: data.teamMembers,
    };

    this.registrations.set(registration.id, registration);
    
    if (!this.eventRegistrations.has(data.eventId)) {
      this.eventRegistrations.set(data.eventId, new Set());
    }
    this.eventRegistrations.get(data.eventId)!.add(data.userEmail);

    return { success: true, registration };
  }

  /**
   * Cancel a registration
   */
  cancel(registrationId: string): { success: boolean; error?: string } {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      return { success: false, error: 'Registration not found' };
    }

    if (registration.status === 'cancelled') {
      return { success: false, error: 'Registration already cancelled' };
    }

    registration.status = 'cancelled';
    
    // Remove from event registrations
    const eventRegs = this.eventRegistrations.get(registration.eventId);
    if (eventRegs) {
      eventRegs.delete(registration.userEmail);
    }

    // Try to promote waitlist
    this.promoteFromWaitlist(registration.eventId);

    return { success: true };
  }

  /**
   * Get registration by ID
   */
  getRegistration(registrationId: string): Registration | undefined {
    return this.registrations.get(registrationId);
  }

  /**
   * Get all registrations for an event
   */
  getEventRegistrations(eventId: string): Registration[] {
    return Array.from(this.registrations.values())
      .filter(reg => reg.eventId === eventId);
  }

  /**
   * Get user's registrations
   */
  getUserRegistrations(userEmail: string): Registration[] {
    return Array.from(this.registrations.values())
      .filter(reg => reg.userEmail === userEmail);
  }

  /**
   * Update payment status
   */
  updatePaymentStatus(
    registrationId: string,
    status: 'completed' | 'failed'
  ): { success: boolean; error?: string } {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      return { success: false, error: 'Registration not found' };
    }

    registration.paymentStatus = status;
    
    if (status === 'completed' && registration.status === 'pending') {
      registration.status = 'confirmed';
    }

    return { success: true };
  }

  /**
   * Set event capacity
   */
  setEventCapacity(eventId: string, capacity: number): void {
    this.eventCapacity.set(eventId, capacity);
  }

  /**
   * Get event registration count
   */
  getEventRegistrationCount(eventId: string): number {
    return this.getEventRegistrations(eventId)
      .filter(reg => reg.status !== 'cancelled').length;
  }

  /**
   * Get waitlist for event
   */
  getWaitlist(eventId: string): Registration[] {
    return this.getEventRegistrations(eventId)
      .filter(reg => reg.status === 'waitlist');
  }

  /**
   * Check if user is registered
   */
  isUserRegistered(eventId: string, userEmail: string): boolean {
    const eventRegs = this.eventRegistrations.get(eventId);
    return eventRegs ? eventRegs.has(userEmail) : false;
  }

  /**
   * Get registration statistics
   */
  getStats(eventId: string): {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    waitlist: number;
  } {
    const regs = this.getEventRegistrations(eventId);
    
    return {
      total: regs.length,
      confirmed: regs.filter(r => r.status === 'confirmed').length,
      pending: regs.filter(r => r.status === 'pending').length,
      cancelled: regs.filter(r => r.status === 'cancelled').length,
      waitlist: regs.filter(r => r.status === 'waitlist').length,
    };
  }

  /**
   * Clear all registrations (for testing)
   */
  clear(): void {
    this.registrations.clear();
    this.eventCapacity.clear();
    this.eventRegistrations.clear();
  }

  // Private helper methods
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  }

  private generateId(): string {
    return `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private promoteFromWaitlist(eventId: string): void {
    const capacity = this.eventCapacity.get(eventId);
    if (capacity === undefined) return;

    const currentCount = this.getEventRegistrations(eventId)
      .filter(r => r.status === 'confirmed').length;
    
    if (currentCount >= capacity) return;

    const waitlist = this.getWaitlist(eventId)
      .sort((a, b) => a.registrationDate.getTime() - b.registrationDate.getTime());
    
    if (waitlist.length > 0) {
      waitlist[0].status = 'confirmed';
    }
  }
}
