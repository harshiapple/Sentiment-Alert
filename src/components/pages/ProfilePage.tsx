import { useMember } from '@/integrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Calendar, User } from 'lucide-react';

export default function ProfilePage() {
  const { member } = useMember();

  const getInitials = (firstName?: string, lastName?: string, nickname?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (nickname) {
      return nickname.slice(0, 2).toUpperCase();
    }
    if (member?.loginEmail) {
      return member.loginEmail.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'BLOCKED':
        return 'bg-red-100 text-red-800';
      case 'OFFLINE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-3xl font-heading font-bold text-foreground">Profile</h1>
          <p className="font-paragraph text-secondary mt-2">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src={member?.profile?.photo?.url} 
                      alt="Profile photo" 
                    />
                    <AvatarFallback className="text-2xl font-heading">
                      {getInitials(
                        member?.contact?.firstName,
                        member?.contact?.lastName,
                        member?.profile?.nickname
                      )}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="font-heading">
                  {member?.profile?.nickname || 
                   `${member?.contact?.firstName || ''} ${member?.contact?.lastName || ''}`.trim() ||
                   'User'}
                </CardTitle>
                {member?.profile?.title && (
                  <p className="font-paragraph text-secondary">{member.profile.title}</p>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <Badge className={getStatusColor(member?.status)}>
                  {member?.status || 'UNKNOWN'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Account Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">First Name</label>
                    <p className="font-paragraph text-foreground">
                      {member?.contact?.firstName || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">Last Name</label>
                    <p className="font-paragraph text-foreground">
                      {member?.contact?.lastName || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">Nickname</label>
                    <p className="font-paragraph text-foreground">
                      {member?.profile?.nickname || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">Title</label>
                    <p className="font-paragraph text-foreground">
                      {member?.profile?.title || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                {member?.contact?.phones && member.contact.phones.length > 0 && (
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">Phone Numbers</label>
                    <div className="space-y-1">
                      {member.contact.phones.map((phone, index) => (
                        <p key={index} className="font-paragraph text-foreground">{phone}</p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-paragraph font-medium text-secondary">Email Address</label>
                  <div className="flex items-center gap-2">
                    <p className="font-paragraph text-foreground">
                      {member?.loginEmail || 'Not provided'}
                    </p>
                    {member?.loginEmailVerified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-paragraph font-medium text-secondary">Account Status</label>
                  <p className="font-paragraph text-foreground">
                    {member?.status || 'Unknown'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Account Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {member?._createdDate && (
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">Member Since</label>
                    <p className="font-paragraph text-foreground">
                      {new Date(member._createdDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
                
                {member?.lastLoginDate && (
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">Last Login</label>
                    <p className="font-paragraph text-foreground">
                      {new Date(member.lastLoginDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                
                {member?._updatedDate && (
                  <div>
                    <label className="text-sm font-paragraph font-medium text-secondary">Profile Updated</label>
                    <p className="font-paragraph text-foreground">
                      {new Date(member._updatedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}