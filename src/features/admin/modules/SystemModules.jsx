import React, { useState } from "react";
import {
  Palette,
  ShieldAlert,
  BarChart3,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Save,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Sliders,
  Database
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Table } from "../../../components/ui/Table";
import { formatPKR, formatDate } from "../../../lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cmsApi,
  staffApi,
  resetDatabaseToDemo,
  exportDatabaseBackup,
  importDatabaseBackup
} from "../../../services/api";
import { siteConfig } from "../../../config/site";
import { toast } from "sonner";

export function CMSVisualEditorModule() {
  const queryClient = useQueryClient();
  const { data: cms } = useQuery({
    queryKey: ["cmsData"],
    queryFn: () => cmsApi.getCMSData(),
  });

  const [heroTitle, setHeroTitle] = useState(cms?.hero?.title || "LIVE · STAY · FEEL HOME");
  const [heroSubtitle, setHeroSubtitle] = useState(cms?.hero?.subtitle || "");
  const [bannerText, setBannerText] = useState(cms?.announcementBanner?.text || "");

  const updateCMSMutation = useMutation({
    mutationFn: (updates) => cmsApi.updateCMSData(updates),
    onSuccess: () => {
      toast.success("Website content published to live website!");
      queryClient.invalidateQueries({ queryKey: ["cmsData"] });
    }
  });

  const handleSaveCMS = (e) => {
    e.preventDefault();
    updateCMSMutation.mutate({
      hero: { ...cms?.hero, title: heroTitle, subtitle: heroSubtitle },
      announcementBanner: { ...cms?.announcementBanner, text: bannerText }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold">Visual CMS Website Editor</h1>
        <p className="text-xs text-ink-500">
          Update public website headlines, top announcement bar, FAQs, and imagery without writing code.
        </p>
      </div>

      <form onSubmit={handleSaveCMS} className="space-y-6">
        {/* Announcement Banner */}
        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
          <h3 className="font-heading text-base font-bold">Top Announcement Banner</h3>
          <Input
            label="Announcement Text"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
          />
        </div>

        {/* Hero Section */}
        <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
          <h3 className="font-heading text-base font-bold">Homepage Hero Section</h3>
          <Input
            label="Hero Headline Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase">Hero Subtitle Paragraph</label>
            <textarea
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="gold"
          size="md"
          className="w-full"
          isLoading={updateCMSMutation.isPending}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Publish Website Content Live
        </Button>
      </form>
    </div>
  );
}

export function StaffRolesModule() {
  const { data: staff = [] } = useQuery({
    queryKey: ["staff"],
    queryFn: () => staffApi.getStaff(),
  });

  const columns = [
    {
      header: "Staff Member",
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover border border-gold-400"
          />
          <div>
            <div className="font-bold">{row.name}</div>
            <div className="text-[11px] text-ink-400">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: "Role Label",
      accessor: "roleLabel",
      cell: (row) => <span className="font-bold text-gold-600">{row.roleLabel || row.role}</span>
    },
    {
      header: "Phone",
      accessor: "phone"
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Staff & Access Permissions Matrix</h1>
        <p className="text-xs text-ink-500">
          Manage roles: Admin, Manager, Front Desk, Housekeeping, and Guest Portal access.
        </p>
      </div>

      <Table
        columns={columns}
        data={staff}
        searchKey="name"
        exportFileName="Zak_Staff_Audit"
      />
    </div>
  );
}

export function ReportsAnalyticsModule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Reports & Advanced Analytics</h1>
        <p className="text-xs text-ink-500">
          Occupancy reports, RevPAR, ADR, and guest nationality breakdown.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-ink-400 uppercase">Average Daily Rate (ADR)</div>
          <div className="font-heading text-2xl font-bold text-gold-600">Rs. 18,400</div>
          <div className="text-xs text-ink-500">Across all occupied suites</div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-ink-400 uppercase">Revenue Per Available Room (RevPAR)</div>
          <div className="font-heading text-2xl font-bold text-gold-600">Rs. 16,100</div>
          <div className="text-xs text-ink-500">87.5% occupancy factor</div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-ink-400 uppercase">Average Length of Stay</div>
          <div className="font-heading text-2xl font-bold text-ink-900 dark:text-white">4.8 Nights</div>
          <div className="text-xs text-ink-500">Short & long stay blended</div>
        </div>
      </div>
    </div>
  );
}

export function SettingsModule() {
  const queryClient = useQueryClient();
  const [resetting, setResetting] = useState(false);

  const handleResetDemoData = async () => {
    if (window.confirm("Are you sure you want to reset all demo data? This will restore original seed apartments, bookings, and CRM leads.")) {
      setResetting(true);
      try {
        await resetDatabaseToDemo();
        queryClient.invalidateQueries();
        toast.success("Database demo data has been reset to original state!");
      } catch (err) {
        toast.error("Failed to reset database.");
      } finally {
        setResetting(false);
      }
    }
  };

  const handleExportBackup = async () => {
    try {
      const backupJson = await exportDatabaseBackup();
      const blob = new Blob([backupJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ZakResidence_Backup_${Date.now()}.json`;
      a.click();
      toast.success("JSON backup exported!");
    } catch (err) {
      toast.error("Failed to export backup.");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold">System Settings & Data Management</h1>
        <p className="text-xs text-ink-500">
          Configure business rules, provincial taxes, and database reset tools.
        </p>
      </div>

      {/* Business Configuration Box */}
      <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4">
        <h3 className="font-heading text-base font-bold">Hospitality & Business Parameters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Business Name" defaultValue={siteConfig.name} readOnly />
          <Input label="WhatsApp Line" defaultValue={siteConfig.phone} readOnly />
          <Input label="Check-In Time" defaultValue={siteConfig.checkInTime} readOnly />
          <Input label="Check-Out Time" defaultValue={siteConfig.checkOutTime} readOnly />
          <Input label="Provincial Tax %" defaultValue={`${siteConfig.taxPercentage}%`} readOnly />
          <Input label="Service Fee %" defaultValue={`${siteConfig.serviceFeePercentage}%`} readOnly />
        </div>
      </div>

      {/* Database Backup & Reset Demo Data Box */}
      <div className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-gold-400/40 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-gold-600 font-heading text-base font-bold">
          <Database className="w-5 h-5" />
          <span>IndexedDB Demo Data Utilities</span>
        </div>
        <p className="text-xs text-ink-500">
          Export your entire local IndexedDB state to JSON, or restore the fresh default seed database anytime.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleExportBackup}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export JSON Backup
          </Button>

          <Button
            variant="danger"
            size="md"
            isLoading={resetting}
            onClick={handleResetDemoData}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Reset Demo Data
          </Button>
        </div>
      </div>
    </div>
  );
}
