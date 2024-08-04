"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { ContentLayout } from "@/components/admin/content-layout";
import { useState } from "react";
import { DownloadIcon, PaperclipIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";
import { useAppDispatch } from "@/lib/hooks";

// Assuming verifications array is fetched or passed as props
const verifications = [
  {
    name: "Liam Johnson",
    email: "liam@example.com",
    gender: "Male",
    birthDate: "1990-01-01",
    address: "123 Main St",
    speciality: "Cardiology",
    attachments: [
      {
        url: "https://s3.eu-north-1.amazonaws.com/lms.aasil.dev/1722412942443-profile.jpg",
        fileName: "profile.jpg",
        mimeType: "image/jpeg",
      },
    ],
    speciality: "Corrupti qui qui mi",
    degreeName: "Cardiology",
    degreeType: "MD",
    degreeInstitution: "Hunter Zamora",
    degreeYear: 1975,
    degreeCity: "Saepe in qui beatae ",
    degreeVerificationType: "Doctor of Osteopathic Medicine Certificate",
    degreeState: "Nesciunt fugiat am",
    degreeCountry: "Dolor dolor voluptas",
    degreeDescription: "Dignissimos quo eum ",
    verified: false,
  },

  // Add more verification objects as needed
];

export default function Component() {
  const [approvalRequests, setApprovalRequests] = useState(verifications);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleReviewClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsReviewModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <ContentLayout title="Admin | Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pending</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="rounded-lg border-none mt-6 bg-background h-full @container">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <main className="flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:flex-row">
            <div className="flex flex-col flex-1 gap-4 md:gap-8 lg:flex-2">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="p-7 flex-row flex items-start justify-between">
                  <div className="flex flex-col space-y-2 text-lg">
                    <CardTitle>Pending Approval Requests</CardTitle>
                    <CardDescription>
                      Review and approve/reject pending requests.
                    </CardDescription>
                  </div>

                  <div className="flex-1 md:grow-0">
                    <Input
                      type="search"
                      placeholder="Search requests..."
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Requester</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Request Type
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvalRequests.map((request, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="mr-4">
                                <AvatarImage src={request?.avatar} />
                                <AvatarFallback>MJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {request?.name}
                                </div>
                                <div className="text-muted-foreground text-sm">
                                  {/* Cardiologist */}
                                  {request?.speciality}
                                </div>
                              </div>
                            </div>

                            {/* <div className="font-medium">{request.name}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {request.email}
                            </div> */}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {request.speciality}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right flex @xl:items-center @xl:flex-row @xl:justify-end gap-2 flex-col place-items-end">
                            {request.verified === false && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReviewClick(request)}
                              >
                                Review
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                            <Button variant="outline" size="sm">
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Dialog open={isReviewModalOpen} onOpenChange={handleCloseModal}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Verify Doctor</DialogTitle>
                  <DialogDescription>
                    Review the doctor's qualifications and approve or reject
                    their verification request.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="grid sm:grid-cols-2 grid-cols-1  gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={`Dr. ${selectedDoctor?.name}`}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={selectedDoctor?.email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        id="gender"
                        value={selectedDoctor?.gender}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Birth Date</Label>
                      <Input
                        id="birthdate"
                        value={selectedDoctor?.birthDate}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={selectedDoctor?.address}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={selectedDoctor?.speciality}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div className="grid gap-4">
                      {selectedDoctor?.attachments.map(
                        (attachment: any, index: number) => (
                          <div className="flex items-center gap-4" key={index}>
                            <div className="flex-1">
                              <div className="font-medium">
                                {selectedDoctor?.degreeVerificationType}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedDoctor?.degreeName +
                                  ", " +
                                  selectedDoctor?.degreeInstitution +
                                  ", " +
                                  selectedDoctor?.degreeYear}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <a
                                href={attachment.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <DownloadIcon className="w-5 h-5" />
                              </a>
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter className="items-center">
                  <RejectRequestDialog
                    verificationId={selectedDoctor?._id}
                    doctorName={selectedDoctor?.name}
                  />

                  <DialogClose>
                    <Button size={"lg"}>Approve</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>{" "}
      </Card>
    </ContentLayout>
  );
}

export const RejectRequestDialog = ({
  verificationId,
  doctorName,
}: {
  verificationId: string;
  doctorName: string;
}) => {
  const [note, setNote] = useState("");
  const dispatch = useAppDispatch();

  const handleRejectDoctorRequest = () => {
    // dispatch(doctorThunks.rejectDoctorRequest({ verificationId, note }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="mt-2">
        <Button variant="outline" size={"lg"}>
          Block
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            You are gonna reject the request of {doctorName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="note" className="sr-only">
            Note
          </Label>
          <Input
            placeholder="Provide a reason for the doctor's rejection (required)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button size={"lg"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleRejectDoctorRequest}
              type="button"
              variant="destructive"
              size={"lg"}
            >
              Reject
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
