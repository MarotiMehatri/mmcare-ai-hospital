import React, { useMemo, useState } from "react";
import TriageHeader from "../../Component/AI/TriageHeader";
import TriageForm from "../../Component/AI/TriageForm";
import TriageResult from "../../Component/AI/TriageResult";
import TriageHistory from "../../Component/AI/TriageHistory";
import {
  DEFAULT_TRIAGE_FORM,
  SYMPTOM_OPTIONS,
} from "../../utils/triageCostants";
import { useTriage } from "../../hooks/useTriage";
import "../../Styles/AI/triage.css";

function AITriagePage() {
  const patient = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || null;
    } catch {
      return null;
    }
  }, []);

  const [formData, setFormData] = useState({
    ...DEFAULT_TRIAGE_FORM,
    patientId: patient?.id || "",
    fullName: patient?.fullName || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
  });

  const {
    loading,
    historyLoading,
    result,
    history,
    symptomsMaster,
    error,
    submitTriage,
  } = useTriage(patient?.id || formData.patientId);

  const symptomList =
    symptomsMaster?.length > 0 ? symptomsMaster : SYMPTOM_OPTIONS;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSymptomSelect = (symptom) => {
    setFormData((prev) => {
      const alreadyExists = prev.symptoms
        .toLowerCase()
        .includes(symptom.toLowerCase());

      return {
        ...prev,
        symptoms: alreadyExists
          ? prev.symptoms
          : prev.symptoms
            ? `${prev.symptoms}, ${symptom}`
            : symptom,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitTriage(formData);
  };
  return (
    <div className="triage-page">
      <TriageHeader />

      <div className="triage-main-grid">
        <div className="triage-left-panel">
          <TriageForm
            formData={formData}
            onChange={handleChange}
            onCheckboxChange={handleCheckboxChange}
            onSymptomSelect={handleSymptomSelect}
            onSubmit={handleSubmit}
            loading={loading}
            symptomsMaster={symptomList}
          />
        </div>

        <div className="triage-right-panel">
          <TriageResult result={result} loading={loading} error={error} />
        </div>
      </div>

      <TriageHistory history={history} loading={historyLoading} />
    </div>
  );
}

export default AITriagePage;
