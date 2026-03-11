// Copyright 2020 Citra Emulator Project
// Licensed under GPLv2+
// Refer to the license.txt file included.

#pragma once

#include "common/vector_math.h"
#include "core/frontend/input.h"

namespace InputManager {

inline std::atomic<int> screen_rotation;

class NDKMotion;

class NDKMotionFactory final : public Input::Factory<Input::MotionDevice> {
public:
    /**
     * Creates a motion device that obtains data from device sensors
     */
    std::unique_ptr<Input::MotionDevice> Create(const Common::ParamPackage& params) override;

    void EnableSensors();
    void DisableSensors();

    /// Returns the current accelerometer reading (in g-force units, 3DS coordinate space).
    /// Returns {0, 0, -1} if no sensor is available.
    Common::Vec3<float> GetAcceleration() const;

private:
    NDKMotion* ndk_motion_device = nullptr;
};
} // namespace InputManager
