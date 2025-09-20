import { apiService } from './api';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'cut' | 'color' | 'treatment' | 'styling';
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  bio: string;
  image: string;
  specialties: string[];
  rating: number;
  yearsExperience: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingRequest {
  services: string[];
  stylistId: string;
  date: string;
  time: string;
  customerNotes?: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  services: Service[];
  stylist: Stylist;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalPrice: number;
  totalDuration: number;
  customerNotes?: string;
  createdAt: string;
}

class BookingService {
  async getServices(): Promise<Service[]> {
    return apiService.get<Service[]>('/services');
  }

  async getStylists(): Promise<Stylist[]> {
    return apiService.get<Stylist[]>('/stylists');
  }

  async getStylistById(id: string): Promise<Stylist> {
    return apiService.get<Stylist>(`/stylists/${id}`);
  }

  async getAvailableSlots(
    stylistId: string,
    date: string,
    duration: number
  ): Promise<TimeSlot[]> {
    return apiService.get<TimeSlot[]>(
      `/availability/${stylistId}?date=${date}&duration=${duration}`
    );
  }

  async createBooking(booking: BookingRequest): Promise<Appointment> {
    return apiService.post<Appointment>('/appointments', booking);
  }

  async getAppointments(customerId?: string): Promise<Appointment[]> {
    const endpoint = customerId 
      ? `/appointments?customerId=${customerId}`
      : '/appointments';
    return apiService.get<Appointment[]>(endpoint);
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    return apiService.get<Appointment>(`/appointments/${id}`);
  }

  async updateAppointment(
    id: string, 
    updates: Partial<BookingRequest>
  ): Promise<Appointment> {
    return apiService.put<Appointment>(`/appointments/${id}`, updates);
  }

  async cancelAppointment(id: string): Promise<void> {
    return apiService.delete<void>(`/appointments/${id}`);
  }

  async rescheduleAppointment(
    id: string,
    newDate: string,
    newTime: string
  ): Promise<Appointment> {
    return apiService.put<Appointment>(`/appointments/${id}/reschedule`, {
      date: newDate,
      time: newTime,
    });
  }
}

export const bookingService = new BookingService();