import { useState, useEffect } from "react";
import { useIotaClient } from "@iota/dapp-kit";
import { createContractService } from "@/lib/contract";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  FileText, 
  Search, 
  Shield, 
  Coins, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  ArrowLeft
} from "lucide-react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import StakingRewards from "./StakingRewards";

interface DashboardProps {
  userRole: string;
  walletAddress: string;
  onBack: () => void;
}

const Dashboard = ({ userRole, walletAddress, onBack }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showTicketForm, setShowTicketForm] = useState(false);

  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0,
    assignedTickets: 0,
    completedTickets: 0,
    pendingReview: 0,
    escalatedTickets: 0,
    certifiedTickets: 0,
    pendingCertification: 0,
    stakingBalance: "0.0 IOTA"
  });

  useEffect(() => {
    if (walletAddress) {
      loadStats();
    }
  }, [walletAddress, userRole]);

  const loadStats = async () => {
    try {
      // Mock data for demonstration
      const mockData = {
        client: {
          totalTickets: 12,
          pendingTickets: 3,
          resolvedTickets: 8,
          stakingBalance: "150.5 IOTA"
        },
        analyst: {
          assignedTickets: 8,
          completedTickets: 15,
          pendingReview: 2,
          stakingBalance: "275.8 IOTA"
        },
        certifier: {
          escalatedTickets: 5,
          certifiedTickets: 23,
          pendingCertification: 3,
          stakingBalance: "420.2 IOTA"
        }
      };

      const roleData = mockData[userRole as keyof typeof mockData];
      if (roleData) {
        setStats(prev => ({ ...prev, ...roleData }));
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-white">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
            </h1>
          </div>
        </div>

        {/* Dashboard content based on role */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-sm text-white/60">Total Tickets</p>
                      <p className="text-2xl font-bold text-white">{stats.totalTickets}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="text-sm text-white/60">Pending</p>
                      <p className="text-2xl font-bold text-white">{stats.pendingTickets}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Coins className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-sm text-white/60">Staking Balance</p>
                      <p className="text-lg font-bold text-white">{stats.stakingBalance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ticket Form */}
            {showTicketForm && (
              <TicketForm 
                userRole={userRole}
                onClose={() => setShowTicketForm(false)}
              />
            )}

            {/* Ticket List */}
            <TicketList userRole={userRole} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button 
                    onClick={() => setShowTicketForm(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Create Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>

            <StakingRewards userRole={userRole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;