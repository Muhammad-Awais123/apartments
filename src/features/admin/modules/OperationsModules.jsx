import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  Package,
  DollarSign,
  Tag,
  Plus,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Calendar,
  Building2,
  Trash2,
  Check
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import { Table } from "../../../components/ui/Table";
import { Modal } from "../../../components/ui/Modal";
import { formatPKR, formatDate } from "../../../lib/utils";
import { generateTenancyAgreementPDF } from "../../../lib/pdfGenerator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeApi, tasksApi, cmsApi, apartmentsApi } from "../../../services/api";
import { toast } from "sonner";

export function LongStayModule() {
  const [tenancyModalOpen, setTenancyModalOpen] = useState(false);
  const [tenancyForm, setTenancyForm] = useState({
    tenantName: "Zubair Hashmi",
    tenantPhone: "+92 302 8847192",
    tenantCnic: "35202-9182736-5",
    apartmentTitle: "Diplomatic 2BR Penthouse with Jacuzzi",
    locationName: "Bahria Town Lahore",
    monthlyRent: 330000,
    securityDeposit: 50000,
    durationMonths: 12,
    startDate: "2026-09-01",
    endDate: "2027-08-31"
  });

  const tenancies = [
    {
      id: "ten-001",
      tenantName: "Zubair Hashmi (Orient Group)",
      apartmentTitle: "Diplomatic 2BR Penthouse (Bahria Town)",
      startDate: "2026-09-01",
      endDate: "2027-08-31",
      monthlyRent: 330000,
      securityDeposit: 50000,
      status: "active",
      nextDue: "2026-10-05"
    },
    {
      id: "ten-002",
      tenantName: "Dr. Ayesha Siddiqui",
      apartmentTitle: "Executive 2BR Luxury Suite (Johar Town)",
      startDate: "2026-09-18",
      endDate: "2026-11-18",
      monthlyRent: 280000,
      securityDeposit: 30000,
      status: "active",
      nextDue: "2026-10-18"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Long-Stay & Tenancy Management</h1>
          <p className="text-xs text-ink-500">
            Monthly rental ledger, security deposits, renewal alerts, and legal agreement generator.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setTenancyModalOpen(true)}
          leftIcon={<FileText className="w-4 h-4" />}
        >
          Generate Tenancy Agreement PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tenancies.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
                {t.status} Tenancy
              </span>
              <span className="text-xs font-mono text-ink-400">Next Rent Due: {t.nextDue}</span>
            </div>

            <div>
              <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white">{t.tenantName}</h3>
              <p className="text-xs text-ink-500">{t.apartmentTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-cream-50 dark:bg-ink-800 text-xs">
              <div>
                <div className="text-[10px] uppercase font-bold text-ink-400">Monthly Rent</div>
                <div className="font-bold text-gold-600 font-heading">{formatPKR(t.monthlyRent)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-ink-400">Security Deposit</div>
                <div className="font-bold text-ink-900 dark:text-white">{formatPKR(t.securityDeposit)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-ink-500">{formatDate(t.startDate)} → {formatDate(t.endDate)}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateTenancyAgreementPDF(t)}
                leftIcon={<Printer className="w-3.5 h-3.5 text-gold-600" />}
              >
                Download Agreement
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Tenancy Agreement Modal */}
      <Modal
        isOpen={tenancyModalOpen}
        onClose={() => setTenancyModalOpen(false)}
        title="Create & Download Official Tenancy Agreement"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateTenancyAgreementPDF(tenancyForm);
            setTenancyModalOpen(false);
            toast.success("Tenancy agreement PDF generated!");
          }}
          className="space-y-4"
        >
          <Input
            label="Tenant Legal Name"
            value={tenancyForm.tenantName}
            onChange={(e) => setTenancyForm({ ...tenancyForm, tenantName: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="CNIC Number"
              value={tenancyForm.tenantCnic}
              onChange={(e) => setTenancyForm({ ...tenancyForm, tenantCnic: e.target.value })}
              required
            />
            <Input
              label="WhatsApp Phone"
              value={tenancyForm.tenantPhone}
              onChange={(e) => setTenancyForm({ ...tenancyForm, tenantPhone: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Monthly Rent (PKR)"
              value={tenancyForm.monthlyRent}
              onChange={(e) => setTenancyForm({ ...tenancyForm, monthlyRent: Number(e.target.value) })}
              required
            />
            <Input
              type="number"
              label="Security Deposit (PKR)"
              value={tenancyForm.securityDeposit}
              onChange={(e) => setTenancyForm({ ...tenancyForm, securityDeposit: Number(e.target.value) })}
              required
            />
          </div>
          <Button type="submit" variant="gold" size="md" className="w-full">
            Generate Official Agreement PDF
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export function HousekeepingModule() {
  const queryClient = useQueryClient();
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    apartmentId: "apt-101",
    apartmentTitle: "The Royal Sky Penthouse",
    type: "cleaning",
    assignedTo: "Rashid Mehmood",
    priority: "high",
    dueDate: "2026-09-20",
    notes: ""
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => tasksApi.getTasks(),
  });

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => tasksApi.updateTaskStatus(id, status),
    onSuccess: () => {
      toast.success("Task status updated!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const createTaskMutation = useMutation({
    mutationFn: (data) => tasksApi.createTask(data),
    onSuccess: () => {
      toast.success("Housekeeping task created!");
      setCreateTaskOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Housekeeping & Room Status Board</h1>
          <p className="text-xs text-ink-500">
            Room clean/dirty status toggles, sanitization checklists, and maintenance tickets.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setCreateTaskOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Assign Housekeeping Task
        </Button>
      </div>

      {/* Room Cleanliness Overview Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {apartments.slice(0, 4).map((apt) => (
          <div
            key={apt.id}
            className="p-4 rounded-2xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold truncate">{apt.title?.split(" ")[0]} {apt.title?.split(" ")[1]}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800">
                Cleaned
              </span>
            </div>
            <div className="text-[11px] text-ink-400">{apt.locationName}</div>
          </div>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold-100 text-gold-800">
                  {task.priority} Priority
                </span>
                <span className="text-xs font-bold text-ink-900 dark:text-white">{task.apartmentTitle}</span>
              </div>
              <span className="text-xs text-ink-400">Assigned: {task.assignedTo} · Due {task.dueDate}</span>
            </div>

            <h4 className="font-heading text-base font-bold text-ink-900 dark:text-white">{task.title}</h4>
            <p className="text-xs text-ink-500">{task.notes}</p>

            {/* Checklist */}
            {task.checklist && (
              <div className="space-y-1.5 pt-2">
                {task.checklist.map((chk, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2 text-xs text-ink-600 dark:text-ink-300">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${chk.done ? "text-emerald-500" : "text-ink-300"}`} />
                    <span className={chk.done ? "line-through opacity-70" : ""}>{chk.item}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-ink-100 dark:border-ink-800">
              <Button
                variant={task.status === "completed" ? "outline" : "gold"}
                size="sm"
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: task.id,
                    status: task.status === "completed" ? "in_progress" : "completed"
                  })
                }
              >
                {task.status === "completed" ? "Mark Incomplete" : "Mark Completed ✓"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        title="Assign New Task / Maintenance Ticket"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTaskMutation.mutate(newTask);
          }}
          className="space-y-4"
        >
          <Input
            label="Task Description"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <Select
            label="Apartment"
            value={newTask.apartmentId}
            onChange={(e) => {
              const apt = apartments.find((a) => a.id === e.target.value);
              setNewTask({ ...newTask, apartmentId: e.target.value, apartmentTitle: apt?.title || "" });
            }}
            options={apartments.map((a) => ({ value: a.id, label: a.title }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Assigned Caretaker"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
            />
            <Input
              type="date"
              label="Due Date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
          </div>
          <Button type="submit" variant="gold" size="md" className="w-full">
            Assign Task
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export function InventoryModule() {
  const queryClient = useQueryClient();

  const { data: inventory = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => tasksApi.getInventory(),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }) => tasksApi.updateInventoryItem(id, { quantity }),
    onSuccess: () => {
      toast.success("Inventory quantity updated!");
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Inventory & Supplies Tracker</h1>
          <p className="text-xs text-ink-500">
            Linens, toiletries, Nespresso pods, and hardware restock alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {inventory.map((item) => {
          const isLow = item.quantity <= item.minThreshold;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl bg-white dark:bg-ink-900 border transition-all space-y-4 ${
                isLow ? "border-amber-400 bg-amber-50/20" : "border-ink-100 dark:border-ink-800"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-gold-600 tracking-wider">
                  {item.category}
                </span>
                {isLow && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Low Stock
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-xs text-ink-400 mt-0.5">Min threshold: {item.minThreshold} {item.unit}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-ink-100 dark:border-ink-800">
                <div className="font-heading text-xl font-bold">
                  {item.quantity} <span className="text-xs text-ink-500 font-normal">{item.unit}</span>
                </div>
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: Math.max(0, item.quantity - 1) })}
                  >
                    -
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity + 5 })}
                  >
                    +5
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FinanceModule() {
  const queryClient = useQueryClient();
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    title: "",
    category: "utilities",
    apartmentTitle: "All Properties (Central)",
    amount: 15000,
    paidTo: "LESCO Electricity",
    paymentMethod: "bank_transfer",
    date: "2026-09-19",
    notes: ""
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => financeApi.getExpenses(),
  });

  const addExpenseMutation = useMutation({
    mutationFn: (data) => financeApi.addExpense(data),
    onSuccess: () => {
      toast.success("Expense entry saved to ledger!");
      setAddExpenseOpen(false);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    }
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const columns = [
    {
      header: "Expense Title",
      accessor: "title",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold">{row.title}</div>
          <div className="text-[11px] text-ink-400">{row.paidTo} · {formatDate(row.date)}</div>
        </div>
      )
    },
    {
      header: "Property",
      accessor: "apartmentTitle",
      sortable: true,
      cell: (row) => <span className="text-xs">{row.apartmentTitle}</span>
    },
    {
      header: "Category",
      accessor: "category",
      cell: (row) => <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-ink-100 text-ink-800">{row.category}</span>
    },
    {
      header: "Amount",
      accessor: "amount",
      sortable: true,
      cell: (row) => <span className="font-bold text-red-600 font-heading">-{formatPKR(row.amount)}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Financial Accounts & P&L</h1>
          <p className="text-xs text-ink-500">
            Monthly expenses, LESCO utility bills, and managed property owner payouts.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setAddExpenseOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Record Expense Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-ink-400 uppercase">Gross Revenue (Sep)</div>
          <div className="font-heading text-2xl font-bold text-emerald-600">Rs. 1,890,000</div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-ink-400 uppercase">Total Expenses & Payouts</div>
          <div className="font-heading text-2xl font-bold text-red-600">-{formatPKR(totalExpenses)}</div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-2">
          <div className="text-xs font-bold text-ink-400 uppercase">Net Operating Income (NOI)</div>
          <div className="font-heading text-2xl font-bold text-gold-600">{formatPKR(1890000 - totalExpenses)}</div>
        </div>
      </div>

      <Table
        columns={columns}
        data={expenses}
        searchKey="title"
        searchPlaceholder="Search expense records..."
        exportFileName="Zak_Expenses_Ledger"
      />

      {/* Add Expense Modal */}
      <Modal
        isOpen={addExpenseOpen}
        onClose={() => setAddExpenseOpen(false)}
        title="Record New Operational Expense"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addExpenseMutation.mutate(expenseForm);
          }}
          className="space-y-4"
        >
          <Input
            label="Expense Title"
            value={expenseForm.title}
            onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={expenseForm.category}
              onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
              options={[
                { value: "utilities", label: "Electricity & Utilities" },
                { value: "maintenance", label: "Repairs & Maintenance" },
                { value: "supplies", label: "Linens & Toiletries" },
                { value: "marketing", label: "Meta & Social Ads" },
                { value: "owner_payout", label: "Owner Rental Payout" }
              ]}
            />
            <Input
              type="number"
              label="Amount (PKR)"
              value={expenseForm.amount}
              onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
              required
            />
          </div>
          <Input
            label="Paid To (Vendor / Company)"
            value={expenseForm.paidTo}
            onChange={(e) => setExpenseForm({ ...expenseForm, paidTo: e.target.value })}
            required
          />
          <Button type="submit" variant="gold" size="md" className="w-full">
            Save Expense Record
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export function PromotionsModule() {
  const queryClient = useQueryClient();
  const [createCouponOpen, setCreateCouponOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discountPercentage: 10,
    description: "",
    minNights: 1,
    expiresAt: "2026-12-31"
  });

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => cmsApi.getCoupons(),
  });

  const createCouponMutation = useMutation({
    mutationFn: (data) => cmsApi.createCoupon(data),
    onSuccess: () => {
      toast.success("Coupon code published!");
      setCreateCouponOpen(false);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Promotions & Discount Coupons</h1>
          <p className="text-xs text-ink-500">
            Manage promotional campaigns, loyalty codes, and seasonal savings rules.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setCreateCouponOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Promo Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coupons.map((c) => (
          <div
            key={c.code}
            className="p-6 rounded-3xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 rounded-full bg-gold-500 text-white text-xs font-bold shadow-xs">
                {c.discountPercentage}% OFF
              </span>
              <span className="text-[10px] text-ink-400">Used {c.usageCount} times</span>
            </div>

            <div className="font-heading text-xl font-bold tracking-wider">{c.code}</div>
            <p className="text-xs text-ink-500">{c.description}</p>
            <div className="text-[10px] text-ink-400 pt-2 border-t border-ink-100">
              Min {c.minNights} nights · Expires {c.expiresAt}
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      <Modal
        isOpen={createCouponOpen}
        onClose={() => setCreateCouponOpen(false)}
        title="Create New Promo Code"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCouponMutation.mutate(couponForm);
          }}
          className="space-y-4"
        >
          <Input
            label="Coupon Code"
            placeholder="e.g. AUTUMNSPECIAL"
            value={couponForm.code}
            onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
            className="uppercase"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Discount %"
              value={couponForm.discountPercentage}
              onChange={(e) => setCouponForm({ ...couponForm, discountPercentage: Number(e.target.value) })}
              required
            />
            <Input
              type="number"
              label="Minimum Nights"
              value={couponForm.minNights}
              onChange={(e) => setCouponForm({ ...couponForm, minNights: Number(e.target.value) })}
              required
            />
          </div>
          <Input
            label="Description"
            placeholder="e.g. 10% off for overseas travelers"
            value={couponForm.description}
            onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
            required
          />
          <Button type="submit" variant="gold" size="md" className="w-full">
            Publish Coupon Code
          </Button>
        </form>
      </Modal>
    </div>
  );
}
