import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, Mail, AlertTriangle, TrendingUp, Users, Settings, LogOut, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FeedbackEmail {
  id: string;
  sender: string;
  subject: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: string;
  aiResponse?: string;
}

const mockEmails: FeedbackEmail[] = [
  {
    id: '1',
    sender: 'john.doe@example.com',
    subject: 'Great service experience!',
    content: 'I had an amazing experience with your customer service team. They were very helpful and resolved my issue quickly.',
    sentiment: 'positive',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    sender: 'sarah.smith@example.com',
    subject: 'Disappointed with recent purchase',
    content: 'The product I received was damaged and the delivery was delayed. Very disappointed with the service.',
    sentiment: 'negative',
    timestamp: '2024-01-15T09:15:00Z',
    aiResponse: 'Dear Sarah, we sincerely apologize for the damaged product and delayed delivery. We take full responsibility for this experience. We would like to offer you a full refund and expedited replacement. Please contact our customer service team at your earliest convenience so we can make this right.'
  },
  {
    id: '3',
    sender: 'mike.johnson@example.com',
    subject: 'Product inquiry',
    content: 'I have some questions about your latest product features. Could you provide more information?',
    sentiment: 'neutral',
    timestamp: '2024-01-15T08:45:00Z'
  },
  {
    id: '4',
    sender: 'lisa.brown@example.com',
    subject: 'Billing issue - urgent',
    content: 'I was charged twice for my last order. This is unacceptable and needs to be fixed immediately.',
    sentiment: 'negative',
    timestamp: '2024-01-14T16:20:00Z',
    aiResponse: 'Dear Lisa, we apologize for the billing error and understand your frustration. We have immediately initiated a refund for the duplicate charge, which should appear in your account within 3-5 business days. We have also implemented additional checks to prevent this from happening again.'
  },
  {
    id: '5',
    sender: 'david.wilson@example.com',
    subject: 'Excellent product quality',
    content: 'The quality of your products continues to impress me. Keep up the great work!',
    sentiment: 'positive',
    timestamp: '2024-01-14T14:10:00Z'
  }
];

const analyticsData = [
  { name: 'Mon', positive: 12, negative: 3, neutral: 8 },
  { name: 'Tue', positive: 15, negative: 2, neutral: 6 },
  { name: 'Wed', positive: 8, negative: 5, neutral: 10 },
  { name: 'Thu', positive: 18, negative: 1, neutral: 7 },
  { name: 'Fri', positive: 22, negative: 4, neutral: 9 },
  { name: 'Sat', positive: 16, negative: 2, neutral: 5 },
  { name: 'Sun', positive: 14, negative: 3, neutral: 8 }
];

const sentimentData = [
  { name: 'Positive', value: 105, color: '#10B981' },
  { name: 'Negative', value: 20, color: '#EF4444' },
  { name: 'Neutral', value: 53, color: '#6B7280' }
];

export default function DashboardPage() {
  const { member, actions } = useMember();
  const [emails, setEmails] = useState<FeedbackEmail[]>(mockEmails);
  const [filteredEmails, setFilteredEmails] = useState<FeedbackEmail[]>(mockEmails);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<FeedbackEmail | null>(null);
  const [editingResponse, setEditingResponse] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');

  useEffect(() => {
    let filtered = emails;
    
    if (searchTerm) {
      filtered = filtered.filter(email => 
        email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (sentimentFilter !== 'all') {
      filtered = filtered.filter(email => email.sentiment === sentimentFilter);
    }
    
    setFilteredEmails(filtered);
  }, [emails, searchTerm, sentimentFilter]);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negative</Badge>;
      case 'neutral':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Neutral</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleEmailClick = (email: FeedbackEmail) => {
    setSelectedEmail(email);
    setEditingResponse(email.aiResponse || '');
  };

  const handleSaveResponse = () => {
    if (selectedEmail) {
      const updatedEmails = emails.map(email => 
        email.id === selectedEmail.id 
          ? { ...email, aiResponse: editingResponse }
          : email
      );
      setEmails(updatedEmails);
      setSelectedEmail({ ...selectedEmail, aiResponse: editingResponse });
    }
  };

  const negativeEmailsCount = emails.filter(email => email.sentiment === 'negative').length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-primary-foreground p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-heading font-bold">Feedback Manager</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary/80">
            <Mail className="mr-3 h-4 w-4" />
            Inbox
          </Button>
          <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary/80">
            <TrendingUp className="mr-3 h-4 w-4" />
            Analytics
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-primary-foreground hover:bg-primary/80"
            onClick={() => window.location.href = '/settings'}
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </nav>

        <div className="border-t border-primary/20 pt-4 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-primary-foreground hover:bg-primary/80"
            onClick={() => window.location.href = '/profile'}
          >
            <User className="mr-3 h-4 w-4" />
            Profile
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-primary-foreground hover:bg-primary/80"
            onClick={actions.logout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-[100rem] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Welcome back, {member?.profile?.nickname || member?.contact?.firstName || 'User'}
            </h1>
            <p className="font-paragraph text-secondary">
              Manage and analyze your customer feedback efficiently
            </p>
          </div>

          {/* Alert for negative emails */}
          {negativeEmailsCount > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
              <span className="font-paragraph text-red-800">
                You have {negativeEmailsCount} negative feedback email{negativeEmailsCount > 1 ? 's' : ''} that need attention.
              </span>
            </div>
          )}

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-paragraph text-secondary">Total Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold text-foreground">{emails.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-paragraph text-secondary">Positive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold text-green-600">
                  {emails.filter(e => e.sentiment === 'positive').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-paragraph text-secondary">Negative</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold text-red-600">
                  {emails.filter(e => e.sentiment === 'negative').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-paragraph text-secondary">Neutral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold text-gray-600">
                  {emails.filter(e => e.sentiment === 'neutral').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Weekly Sentiment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="positive" fill="#10B981" />
                    <Bar dataKey="negative" fill="#EF4444" />
                    <Bar dataKey="neutral" fill="#6B7280" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
              <Input
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={sentimentFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSentimentFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={sentimentFilter === 'positive' ? 'default' : 'outline'}
                onClick={() => setSentimentFilter('positive')}
                size="sm"
              >
                Positive
              </Button>
              <Button
                variant={sentimentFilter === 'negative' ? 'default' : 'outline'}
                onClick={() => setSentimentFilter('negative')}
                size="sm"
              >
                Negative
              </Button>
              <Button
                variant={sentimentFilter === 'neutral' ? 'default' : 'outline'}
                onClick={() => setSentimentFilter('neutral')}
                size="sm"
              >
                Neutral
              </Button>
            </div>
          </div>

          {/* Email List */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Feedback Inbox</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleEmailClick(email)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-paragraph font-medium text-foreground">{email.sender}</span>
                          {getSentimentBadge(email.sentiment)}
                        </div>
                        <h3 className="font-paragraph font-semibold text-foreground">{email.subject}</h3>
                      </div>
                      <span className="text-sm font-paragraph text-secondary">
                        {new Date(email.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-paragraph text-secondary text-sm line-clamp-2">{email.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Email Detail Modal */}
      <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading">{selectedEmail?.subject}</DialogTitle>
          </DialogHeader>
          {selectedEmail && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-paragraph font-medium">{selectedEmail.sender}</span>
                  {getSentimentBadge(selectedEmail.sentiment)}
                </div>
                <span className="text-sm font-paragraph text-secondary">
                  {new Date(selectedEmail.timestamp).toLocaleString()}
                </span>
              </div>
              
              <div>
                <h4 className="font-paragraph font-semibold mb-2">Message:</h4>
                <p className="font-paragraph text-secondary">{selectedEmail.content}</p>
              </div>

              {selectedEmail.sentiment === 'negative' && (
                <div>
                  <h4 className="font-paragraph font-semibold mb-2">AI Suggested Response:</h4>
                  <Textarea
                    value={editingResponse}
                    onChange={(e) => setEditingResponse(e.target.value)}
                    placeholder="AI will generate a response suggestion for negative feedback..."
                    rows={6}
                    className="mb-3"
                  />
                  <Button onClick={handleSaveResponse} className="bg-primary text-primary-foreground">
                    Save Response
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}