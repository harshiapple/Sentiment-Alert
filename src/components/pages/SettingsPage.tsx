import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, MessageSquare, Bell, Shield, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailSettings {
  server: string;
  port: string;
  username: string;
  password: string;
  ssl: boolean;
  autoFetch: boolean;
  fetchInterval: string;
}

interface SlackSettings {
  webhookUrl: string;
  channel: string;
  notifyNegative: boolean;
  notifyAll: boolean;
}

interface NotificationSettings {
  emailAlerts: boolean;
  slackAlerts: boolean;
  pushNotifications: boolean;
  dailyDigest: boolean;
}

export default function SettingsPage() {
  const { toast } = useToast();
  
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    server: 'imap.gmail.com',
    port: '993',
    username: '',
    password: '',
    ssl: true,
    autoFetch: true,
    fetchInterval: '5'
  });

  const [slackSettings, setSlackSettings] = useState<SlackSettings>({
    webhookUrl: '',
    channel: '#feedback',
    notifyNegative: true,
    notifyAll: false
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailAlerts: true,
    slackAlerts: true,
    pushNotifications: false,
    dailyDigest: true
  });

  const handleSaveEmailSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: "Email settings saved",
      description: "Your email integration settings have been updated successfully.",
    });
  };

  const handleSaveSlackSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: "Slack settings saved",
      description: "Your Slack integration settings have been updated successfully.",
    });
  };

  const handleSaveNotificationSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const testEmailConnection = () => {
    // In a real app, this would test the email connection
    toast({
      title: "Testing email connection...",
      description: "This feature would test your email server connection in a real implementation.",
    });
  };

  const testSlackConnection = () => {
    // In a real app, this would test the Slack webhook
    toast({
      title: "Testing Slack connection...",
      description: "This feature would send a test message to your Slack channel in a real implementation.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/dashboard'}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
          <p className="font-paragraph text-secondary mt-2">
            Configure your email and Slack integrations
          </p>
        </div>

        <div className="space-y-8">
          {/* Email Integration Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-server">IMAP Server</Label>
                  <Input
                    id="email-server"
                    value={emailSettings.server}
                    onChange={(e) => setEmailSettings({...emailSettings, server: e.target.value})}
                    placeholder="imap.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-port">Port</Label>
                  <Input
                    id="email-port"
                    value={emailSettings.port}
                    onChange={(e) => setEmailSettings({...emailSettings, port: e.target.value})}
                    placeholder="993"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-username">Username/Email</Label>
                  <Input
                    id="email-username"
                    type="email"
                    value={emailSettings.username}
                    onChange={(e) => setEmailSettings({...emailSettings, username: e.target.value})}
                    placeholder="your-email@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-password">Password/App Password</Label>
                  <Input
                    id="email-password"
                    type="password"
                    value={emailSettings.password}
                    onChange={(e) => setEmailSettings({...emailSettings, password: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ssl-enabled"
                    checked={emailSettings.ssl}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, ssl: checked})}
                  />
                  <Label htmlFor="ssl-enabled">Use SSL/TLS encryption</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-fetch"
                    checked={emailSettings.autoFetch}
                    onCheckedChange={(checked) => setEmailSettings({...emailSettings, autoFetch: checked})}
                  />
                  <Label htmlFor="auto-fetch">Enable automatic email fetching</Label>
                </div>

                {emailSettings.autoFetch && (
                  <div className="space-y-2">
                    <Label htmlFor="fetch-interval">Fetch interval (minutes)</Label>
                    <Input
                      id="fetch-interval"
                      type="number"
                      value={emailSettings.fetchInterval}
                      onChange={(e) => setEmailSettings({...emailSettings, fetchInterval: e.target.value})}
                      placeholder="5"
                      className="w-32"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveEmailSettings} className="bg-primary text-primary-foreground">
                  <Save className="mr-2 h-4 w-4" />
                  Save Email Settings
                </Button>
                <Button variant="outline" onClick={testEmailConnection}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Slack Integration Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Slack Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    value={slackSettings.webhookUrl}
                    onChange={(e) => setSlackSettings({...slackSettings, webhookUrl: e.target.value})}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                  <p className="text-sm font-paragraph text-secondary">
                    Create a webhook URL in your Slack workspace settings
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slack-channel">Default Channel</Label>
                  <Input
                    id="slack-channel"
                    value={slackSettings.channel}
                    onChange={(e) => setSlackSettings({...slackSettings, channel: e.target.value})}
                    placeholder="#feedback"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notify-negative"
                    checked={slackSettings.notifyNegative}
                    onCheckedChange={(checked) => setSlackSettings({...slackSettings, notifyNegative: checked})}
                  />
                  <Label htmlFor="notify-negative">Send alerts for negative feedback</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="notify-all"
                    checked={slackSettings.notifyAll}
                    onCheckedChange={(checked) => setSlackSettings({...slackSettings, notifyAll: checked})}
                  />
                  <Label htmlFor="notify-all">Send notifications for all feedback</Label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveSlackSettings} className="bg-primary text-primary-foreground">
                  <Save className="mr-2 h-4 w-4" />
                  Save Slack Settings
                </Button>
                <Button variant="outline" onClick={testSlackConnection}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-alerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailAlerts: checked})}
                  />
                  <Label htmlFor="email-alerts">Email alerts for urgent feedback</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="slack-alerts"
                    checked={notificationSettings.slackAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, slackAlerts: checked})}
                  />
                  <Label htmlFor="slack-alerts">Slack notifications</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                  />
                  <Label htmlFor="push-notifications">Browser push notifications</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="daily-digest"
                    checked={notificationSettings.dailyDigest}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, dailyDigest: checked})}
                  />
                  <Label htmlFor="daily-digest">Daily feedback digest email</Label>
                </div>
              </div>

              <Button onClick={handleSaveNotificationSettings} className="bg-primary text-primary-foreground">
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>

          {/* AI Response Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                AI Response Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="response-template">Default Response Template</Label>
                <Textarea
                  id="response-template"
                  placeholder="Enter a template for AI-generated responses..."
                  rows={4}
                  defaultValue="Dear [Customer Name],

Thank you for your feedback. We sincerely apologize for any inconvenience you've experienced. Your concerns are important to us, and we are committed to making this right.

[Specific response based on the feedback content]

We appreciate your patience and look forward to serving you better.

Best regards,
Customer Service Team"
                />
                <p className="text-sm font-paragraph text-secondary">
                  This template will be used as a base for AI-generated responses to negative feedback
                </p>
              </div>

              <Button className="bg-primary text-primary-foreground">
                <Save className="mr-2 h-4 w-4" />
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}