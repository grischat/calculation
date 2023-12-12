import { useFormik } from "formik";
import { useEffect } from "react";
import "./App.scss";

function App() {
  const formik = useFormik({
    initialValues: {
      totalItems: "274000",
      itemsPerExec: "20",
      execRatePerHour: "30",
      execRatePerDay: "8",
      totalRuns: "",
      runsPerDay: "",
      totalDays: "",
      totalExecs: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const jsonText = JSON.stringify(values, null, 2);
      const newWindow = window.open("", "_blank", "width=600,height=600");
      newWindow.document.write(`<pre>${jsonText}</pre>`);
      setSubmitting(false);
    },
  });
  useEffect(() => {
    const totalRuns = Math.ceil(
      formik.values.totalItems / formik.values.itemsPerExec
    );
    const runsPerDay = Math.ceil(
      formik.values.execRatePerHour * formik.values.execRatePerDay
    );
    const totalDays = Math.ceil(totalRuns / runsPerDay);

    const totalExecs = Math.ceil(60 / formik.values.execRatePerHour);

    const execRatePerDay = parseFloat(formik.values.execRatePerDay);
    if (isNaN(execRatePerDay) || execRatePerDay < 0 || execRatePerDay > 24) {
      formik.setFieldError(
        "execRatePerDay",
        "Invalid value. Must be between 0 and 24."
      );
      formik.setFieldValue("execRatePerDay", "No days added");
      return;
    }
    formik.setFieldValue("totalRuns", totalRuns);
    formik.setFieldValue("runsPerDay", runsPerDay);
    formik.setFieldValue("totalDays", totalDays);
    formik.setFieldValue("totalExecs", totalExecs);
  }, [
    formik.values.totalItems,
    formik.values.itemsPerExec,
    formik.values.execRatePerHour,
    formik.values.execRatePerDay,
  ]);

  return (
    <>
      <form id="form" onSubmit={formik.handleSubmit}>
        <div className="values__container">
          <div className="label-input-container">
            <label htmlFor="totalItems">Total items </label>
            <input
              id="totalItems"
              name="totalItems"
              className="input"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalItems}
            />
            <span>(item)</span>
          </div>
          <div className="label-input-container">
            <label htmlFor="itemsPerExec">Items per execution</label>
            <input
              id="itemsPerExec"
              name="itemsPerExec"
              className="input"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.itemsPerExec}
            />
            <span> (item/exec)</span>
          </div>
          <div className="label-input-container">
            <label htmlFor="execRatePerHour">Execution rate per hour</label>
            <input
              id="execRatePerHour"
              name="execRatePerHour"
              className="input"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.execRatePerHour}
            />
            <span>(exec/hour)</span>
          </div>
          <div className="label-input-container">
            <label htmlFor="execRatePerDay">Executions per day</label>
            <input
              id="execRatePerDay"
              name="execRatePerDay"
              className="input"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.execRatePerDay}
              min="0"
              max="24"
            />
            <span>(hour/day)</span>
          </div>
        </div>
        <div className="results__container">
          <label>
            Total runs (exec)
            <p>
              {isNaN(formik.values.totalRuns) ? "0" : formik.values.totalRuns}
            </p>
          </label>
          <label>
            Runs per day (exec/day)
            <p>
              {isNaN(formik.values.runsPerDay) ? "0" : formik.values.runsPerDay}
            </p>
          </label>
          <label>
            Total days (day)
            <p>
              {isNaN(formik.values.totalDays) ? "0" : formik.values.totalDays}
            </p>
          </label>
          <label>
            Execute every X minute (frequency)
            <p>
              {isNaN(formik.values.totalExecs) ? "0" : formik.values.totalExecs}
            </p>
          </label>
        </div>
        <button type="submit">Get in JSON format</button>
      </form>
    </>
  );
}

export default App;
