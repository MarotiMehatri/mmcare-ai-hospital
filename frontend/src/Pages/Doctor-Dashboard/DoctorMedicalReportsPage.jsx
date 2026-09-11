import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllPatients,
} from "../../services/Doctor/reportAPI";

import {
  getAllMedicalReports,
  deleteMedicalReport,
} from "../../services/MedicalReports/MedicalReportAPI";

import ReportUploadForm from "../../Component/Doctor/ReportUploadForm";

import DoctorReportsStats from "../../Component/Doctor/DoctorReportsStats";

import MedicalReportsTable from "../../Component/tables/MedicalReportsTable";

import EmptyReportsState from "../../Component/Doctor/EmptyReportsState";

import "../../Styles/Doctor/DoctorMedicalReportsPage.css";

function DoctorMedicalReportsPage() {
  const doctor = useMemo(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem(
            "doctor"
          )
        ) || {}
      );
    } catch {
      return {};
    }
  }, []);

  const [reports, setReports] =
    useState([]);

  const [patients, setPatients] =
    useState([]);

  const [pageLoading, setPageLoading] =
    useState(true);

  const loadPageData =
    useCallback(async () => {
      try {
        setPageLoading(true);

        const [
          reportsRes,
          patientsRes,
        ] = await Promise.all([
          getAllMedicalReports(),
          getAllPatients(),
        ]);

        const reportsData =
          Array.isArray(
            reportsRes?.data
          )
            ? reportsRes.data
            : Array.isArray(
                reportsRes?.data?.data
              )
            ? reportsRes.data.data
            : [];

        const patientsData =
          Array.isArray(
            patientsRes?.data
          )
            ? patientsRes.data
            : Array.isArray(
                patientsRes?.data?.data
              )
            ? patientsRes.data.data
            : [];

        setReports(
          reportsData
        );

        setPatients(
          patientsData
        );
      } catch (error) {
        console.error(
          "Failed to load medical reports:",
          error
        );

        setReports([]);
        setPatients([]);
      } finally {
        setPageLoading(false);
      }
    }, []);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  const handleDelete =
    async (id) => {
      if (!id) {
        alert(
          "Invalid medical report ID"
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this medical report?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteMedicalReport(
          id
        );

        alert(
          "Medical report deleted successfully."
        );

        await loadPageData();
      } catch (error) {
        console.error(
          "Delete medical report failed:",
          error
        );

        alert(
          "Failed to delete medical report."
        );
      }
    };

  const safeReports =
    Array.isArray(reports)
      ? reports
      : [];

  return (
    <div className="doctor-medical-reports-page">
      <div className="doctor-medical-reports-header">
        <div>
          <h2>
            Doctor Medical Reports
          </h2>

          <p>
            Upload, view and manage
            patient medical reports.
          </p>
        </div>

        <div className="doctor-medical-reports-doctor-box">
          <span>
            Logged in Doctor
          </span>

          <strong>
            {doctor?.FullName ||
              doctor?.fullName ||
              doctor?.name ||
              "Doctor"}
          </strong>
        </div>
      </div>

      <DoctorReportsStats
        reports={
          safeReports
        }
      />

      <div className="doctor-medical-reports-stack-layout">
        <div className="doctor-medical-reports-top">
          <ReportUploadForm
            patients={
              patients
            }
            onSuccess={
              loadPageData
            }
          />
        </div>

        <div className="doctor-medical-reports-bottom">
          {pageLoading ? (
            <div className="doctor-report-loading-box">
              Loading medical
              reports...
            </div>
          ) : safeReports.length ===
            0 ? (
            <EmptyReportsState />
          ) : (
            <MedicalReportsTable
              reports={
                safeReports
              }
              patients={
                patients
              }
              onDelete={
                handleDelete
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorMedicalReportsPage;