// Mock data for the ElderCare Companion app
window.MockData = (function() {
  const now = new Date();
  const todayStr = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

  const medicines = [
    { id: 'med1', name: 'Amlodipine', dosage: '5 mg', schedule: 'Morning', nextTime: '8:00 AM' },
    { id: 'med2', name: 'Metformin', dosage: '500 mg', schedule: 'Evening', nextTime: '8:00 PM' },
    { id: 'med3', name: 'Atorvastatin', dosage: '10 mg', schedule: 'Night', nextTime: '9:30 PM' },
    { id: 'med4', name: 'Vitamin D3', dosage: '1000 IU', schedule: 'Morning', nextTime: '8:00 AM' }
  ];

  const appointments = [
    { id: 'appt1', doctor: 'Dr. Anita Rao', specialty: 'Cardiologist', date: todayStr, time: '3:30 PM', location: 'City Clinic, 2nd Floor' }
  ];

  const careTeam = [
    { id: 'doc1', role: 'Doctor', name: 'Dr. Anita Rao', specialty: 'Cardiology', phone: '+1-555-0101' },
    { id: 'nurse1', role: 'Nurse', name: 'Nurse Sam Lee', specialty: 'Home Care', phone: '+1-555-0123' }
  ];

  const familyContacts = [
    { id: 'fam1', relation: 'Daughter', name: 'Priya Rao', phone: '+1-555-0202' },
    { id: 'fam2', relation: 'Son', name: 'Rahul Rao', phone: '+1-555-0203' }
  ];

  // Generate simple step history for last 14 days
  const stepsHistory = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const steps = 4000 + Math.floor(Math.random() * 4000); // 4k - 8k
    return { date: d, steps };
  });

  const todaySteps = stepsHistory[stepsHistory.length - 1].steps;
  const daysOver5k = stepsHistory.filter(d => d.steps >= 5000).length;

  const events = [
    { id: 'evt1', title: 'Morning Yoga', date: 'Oct 20, 10:00 AM', location: 'Community Center Hall A', registered: true },
    { id: 'evt2', title: 'Nutrition Workshop', date: 'Oct 25, 2:00 PM', location: 'Health Hub Room 3', registered: true },
    { id: 'evt3', title: 'Evening Walk Group', date: 'Oct 28, 6:00 PM', location: 'Lakeside Park', registered: false }
  ];

  const notifications = [
    { id: 'n1', type: 'medicine', title: 'Take Amlodipine', time: 'in 20 min' },
    { id: 'n2', type: 'appointment', title: 'Appointment with Dr. Rao', time: 'today, 3:30 PM' },
    { id: 'n3', type: 'event', title: 'Morning Yoga', time: 'Oct 20, 10:00 AM' }
  ];

  const conciergeCategories = [
    { id: 'cg1', name: 'Groceries', desc: 'Order daily essentials and groceries' },
    { id: 'cg2', name: 'Household Help', desc: 'Cleaning, handyman, bill payments' },
    { id: 'cg3', name: 'Transport', desc: 'Book a cab or ambulance' },
    { id: 'cg4', name: 'Other', desc: 'Talk to our agent for anything else' }
  ];

  const errands = [
    { id: 'er1', name: 'Groceries', examples: 'Fruits, vegetables, milk' },
    { id: 'er2', name: 'Plumber', examples: 'Leaks, faucet repair' },
    { id: 'er3', name: 'Electrician', examples: 'Switches, lights, wiring' },
    { id: 'er4', name: 'Pharmacy', examples: 'Prescription pickup' },
    { id: 'er5', name: 'Other', examples: 'Any other help you need' }
  ];

  return {
    medicines,
    appointments,
    careTeam,
    familyContacts,
    todaySteps,
    stepsHistory,
    daysOver5k,
    events,
    notifications,
    conciergeCategories,
    errands
  };
})();


