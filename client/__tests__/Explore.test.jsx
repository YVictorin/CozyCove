import { render, screen, fireEvent } from "@testing-library/react";
import Explore from "../src/pages/Explore";
import { describe, it, expect, vi } from "vitest";

// Mock components that rely on external data or heavy UI elements
vi.mock("../components/ResourceCard", () => ({
  default: () => <div data-testid="resource-card">ResourceCard</div>
}));

vi.mock("../components/SupportBot", () => ({
  default: () => <div data-testid="support-bot">SupportBot</div>
}));

vi.mock("../components/VisualSchedule", () => ({
  default: () => <div data-testid="visual-schedule">VisualSchedule</div>
}));

// Mock data
vi.mock("../data/faqData", () => ({
  default: [
    { question: "What is this?", answer: "This is a test FAQ." }
  ]
}));

vi.mock("../data/categoryCard", () => ({
  default: [{ title: "Test Category", description: "Test Description" }]
}));

describe("Explore Page", () => {
  it("renders Explore page correctly", () => {
    render(<Explore />);
    expect(screen.getByText("GROWN-UPS")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Our Resource Center")).toBeInTheDocument();
    expect(screen.getByText("Resource Categories")).toBeInTheDocument();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("toggles FAQ section on click", () => {
    render(<Explore />);
    const faqQuestion = screen.getByText("What is this?");
    
    // Initially the answer should not be visible
    expect(screen.queryByText("This is a test FAQ.")).not.toBeInTheDocument();
    
    // Click to show the answer
    fireEvent.click(faqQuestion);
    expect(screen.getByText("This is a test FAQ.")).toBeInTheDocument();
    
    // Click again to hide the answer
    fireEvent.click(faqQuestion);
    expect(screen.queryByText("This is a test FAQ.")).not.toBeInTheDocument();
  });

  it("renders mock components correctly", () => {
    render(<Explore />);
    expect(screen.getByText("ResourceCard")).toBeInTheDocument();
    expect(screen.getByText("SupportBot")).toBeInTheDocument();
    expect(screen.getByText("VisualSchedule")).toBeInTheDocument();
  });
});